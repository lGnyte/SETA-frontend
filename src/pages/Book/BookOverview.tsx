import {Link, useParams} from "react-router-dom";
import {useAuth} from "../../lib/auth-context.tsx";
import {useEffect, useState} from "react";
import type {Book} from "../../types/book.ts";
import api from "../../lib/axios.ts";
import toast from "react-hot-toast";

export default function BookOverviewPage() {
    const {id} = useParams<{ id: string }>();
    const {token, userId} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [book, setBook] = useState<Book | null>(null);
    const [isOwner, setIsOwner] = useState(false);

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
                        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                        <p className="text-[#5fb6a4] mb-4">By {book.owner.username}</p>
                        <p className="text-gray-700 mb-6">{book.description}</p>

                        {/* Owner vs Non-owner */}
                        {isOwner ? (
                            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
                                <p className="font-semibold flex justify-center">
                                    {/*{book.requestsCount} users have requested to contribute to this book*/}
                                </p>
                                <div className="mt-2 flex justify-center">
                                    <button
                                        className="px-4 py-2 bg-[#90D1CA] hover:bg-[#5fb6a4] text-white font-semibold text-sm rounded-md">
                                        View and manage requests
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-6">
                                <button
                                    className="px-4 py-2 bg-[#90D1CA] hover:bg-[#5fb6a4] text-white font-semibold text-sm rounded-md">
                                    Request to Collaborate
                                </button>
                            </div>
                        )}
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

                {/* Bottom button */}
                <div className="mt-6">
                    <Link
                        to={`/book/${book.id}/chapter/new`}
                        state={{bookTitle: book.title}}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                        Add New Chapter
                    </Link>
                </div>
                {/* Chapters Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-6">Chapters</h2>

                    <div className="space-y-8">
                        {book.chapters
                            .map((chapter, index) => {
                                const isFinished = chapter.isFinished;
                                return (
                                    <div key={index}>
                                        <h3 className="font-semibold mb-1">{chapter.title}</h3>
                                        <p className="text-gray-600 mb-2">
                                            {
                                                chapter.content.length > 500
                                                    ? chapter.content.slice(0, 500) + '...'
                                                    : chapter.content
                                            }
                                        </p>
                                        {isFinished ? (
                                            <Link
                                                to={`/chapter/${chapter.id}`}
                                                className="px-4 py-2 cursor-pointer text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                                            >
                                                See more
                                            </Link>
                                        ) : (
                                            <Link
                                                to={`/chapter/${chapter.id}/edit`}
                                                className="px-4 py-2 cursor-pointer text-sm bg-green-100 hover:bg-green-200 rounded-md"
                                            >
                                                Contribute
                                            </Link>)}
                                    </div>)
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}
