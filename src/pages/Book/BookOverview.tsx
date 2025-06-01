import {Link, useParams} from "react-router-dom";
import {useAuth} from "../../lib/auth-context.tsx";
import {useEffect, useState} from "react";
import type {Book} from "../../types/book.ts";
import api from "../../lib/axios.ts";
import toast from "react-hot-toast";
import ModalWrapper from "../../components/ModalWrapper.tsx";
import {FaEye, FaReadme} from "react-icons/fa";
import {TfiWrite} from "react-icons/tfi";

export default function BookOverviewPage() {
    const { id } = useParams<{ id: string }>();
    const { token, userId } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [book, setBook] = useState<Book | null>(null);
    const [isOwner, setIsOwner] = useState(false);
    const [requestsModalOpen, setRequestsModalOpen] = useState(false);

    const handleRequestToCollaborate = async (chapterId: string) => {
        try {
            setIsLoading(true);
            const response = await api.post(`/chapters/${chapterId}/requestEdit`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 204) {
                toast.success('Edit request sent successfully!');
                setIsSent(true);
                return true;
            } else {
                toast.error('Unexpected response from server.');
                return false;
            }
            
        } catch (error) {
            console.error('Request failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!token || !id) return;

        (async () => {
            setIsLoading(true);
            setBook(null);

            try {
                const response = await api.get(`/books/${id}`);

                if (response.status === 200) {
                    const fetchedBook = response.data.data;
                    setBook(fetchedBook);

                    // Check ownership
                    if (fetchedBook.ownerId === userId) {
                        setIsOwner(true);
                    } else {
                        setIsOwner(false);
                    }
                } else {
                    toast.error("Book not found.");
                }
            } catch (err) {
                if (err instanceof Error) {
                    toast.error("Error fetching data: " + err.message);
                } else {
                    toast.error("An unknown error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        })();
    }, [token, id, userId]);

    if (isLoading) {
        return <div>Loading book details...</div>;
    }

    if (!book || Object.keys(book).length === 0) {
        return <div>No info found for book</div>;
    }
    
    return (
        <div className="p-6">
            <div className="bg-white p-10 relative">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between gap-10">
                    <div className="flex-1">
                        <div className="bg-white mb-5 p-6 rounded-lg shadow-sm">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                            <p className="text-teal-600 font-medium mb-2">By @{book.owner.username}</p>
                            <p className="text-gray-700 mb-4">{book.description || 'No description provided.'}</p>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <span><strong>Status:</strong> {book.finished ? 'Finished' : 'In Progress'}</span>
                                <span><strong>AI Enabled:</strong> {book.aiEnabled ? 'Yes' : 'No'}</span>
                                <span><strong>Genres:</strong> {book.genres?.map(g => g.name).join(', ') || 'N/A'}</span>
                                <span><strong>Chapters:</strong> {book.chapters?.length || 0}</span>
                                <span><strong>Characters:</strong> {book.characters?.length || 0}</span>
                                <span><strong>Created:</strong> {new Date(book.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Book Cover */}
                    <div className="flex justify-center md:justify-end">
                        <img
                            src={book.coverUrl}
                            alt="Book Cover"
                            className="w-48 h-auto shadow-md"
                        />
                    </div>
                </div>

                {isOwner &&
                    <Link
                        to={`/book/${book.id}/chapter/new`}
                        state={{ bookTitle: book.title }}
                        className="px-4 inline-flex gap-2 py-2 bg-[#90D1CA] hover:bg-[#5fb6a4] text-white rounded-md font-bold test-sm"
                    >
                        <TfiWrite size={20} />
                        Add New Chapter
                    </Link>
                }
                </div>
                <div className="mt-6">
                {/* Chapters Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-6">Book Chapters</h2>

                    <div className="space-y-8">
                        {book.chapters.map((chapter, index) => (
                            <div className="bg-white mb-5 p-6 rounded-lg shadow-sm" key={index}>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{chapter.title}</h2>

                                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{
                                    chapter.content.length > 500
                                    ? chapter.content.slice(0, 500) + '...'
                                    : chapter.content
                                }</p>

                                <div className="flex justify-start gap-2">
                                    <Link
                                        to={`/book/${book.id}/chapter/${chapter.id}/readChapter`}
                                        className="px-4 py-1 flex gap-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md text-sm font-semibold"
                                    >
                                        <FaReadme size={20} />
                                        Start reading
                                    </Link>

                                    {!chapter.finished ?
                                        (isOwner ? (
                                            <>
                                                <button className="cursor-pointer flex gap-2 px-4 py-1 bg-[#90D1CA] hover:bg-[#5fb6a4] text-white font-semibold text-sm rounded-md"
                                                        onClick={() => setRequestsModalOpen(!requestsModalOpen)}>
                                                    <FaEye size={20} />
                                                    View and manage requests
                                                </button>
                                                <ModalWrapper isOpen={requestsModalOpen} onClose={() => setRequestsModalOpen(false)}>
                                                    <div className="space-y-4">
                                                        {/* Request 1 */}
                                                        <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
                                                            <p className="text-sm text-gray-800 mb-1">
                                                                <strong>@user_1</strong> requested to edit <strong>Chapter 2</strong>.
                                                            </p>
                                                            <p className="text-sm text-gray-600 mb-3">“I’d like to expand the dialogue in this scene and smooth out transitions.”</p>
                                                            <div className="flex gap-2">
                                                                <button className="cursor-pointer px-3 py-1 text-sm bg-green-400 hover:bg-green-300 text-white rounded-md">Accept</button>
                                                                <button className="cursor-pointer px-3 py-1 text-sm bg-red-400 hover:bg-red-300 text-white rounded-md">Decline</button>
                                                            </div>
                                                        </div>

                                                        {/* Request 2 */}
                                                        <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
                                                            <p className="text-sm text-gray-800 mb-1">
                                                                <strong>@money</strong> requested to contribute to <strong>Chapter 2</strong>.
                                                            </p>
                                                            <p className="text-sm text-gray-600 mb-3">“I have an idea to enhance the ending with more suspense and foreshadowing.”</p>
                                                            <div className="flex gap-2">
                                                                <button className="cursor-pointer px-3 py-1 text-sm bg-green-400 hover:bg-green-300 text-white rounded-md">Accept</button>
                                                                <button className="cursor-pointer px-3 py-1 text-sm bg-red-400 hover:bg-red-300 text-white rounded-md">Decline</button>
                                                            </div>
                                                        </div>

                                                        {/* Request 3 */}
                                                        <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
                                                            <p className="text-sm text-gray-800 mb-1">
                                                                <strong>@sely</strong> requested to help with <strong>Chapter 2</strong>.
                                                            </p>
                                                            <p className="text-sm text-gray-600 mb-3">“Can I contribute some descriptive writing to strengthen the atmosphere?”</p>
                                                            <div className="flex gap-2">
                                                                <button className="cursor-pointer px-3 py-1 text-sm bg-green-400 hover:bg-green-300 text-white rounded-md">Accept</button>
                                                                <button className="cursor-pointer px-3 py-1 text-sm bg-red-400 hover:bg-red-300 text-white rounded-md">Decline</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </ModalWrapper>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="cursor-pointer px-4 py-1 bg-orange-300 hover:bg-orange-200 text-white font-semibold text-sm rounded-md disabled:opacity-50"
                                                    onClick={() => handleRequestToCollaborate(chapter.id)}
                                                    disabled={isLoading || isSent}
                                                >
                                                    {isSent ? 'Request Sent ✅' : isLoading ? 'Sending...' : 'Request to Collaborate'}
                                                </button>
                                            </>
                                        ))
                                        :
                                        (
                                            <span className="font-semibold">{chapter.finished ? 'Finished' : 'In Progress'}</span>
                                        )
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
