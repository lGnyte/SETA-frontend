import {useParams} from "react-router-dom";
import {useAuth} from "../../lib/auth-context.tsx";
import {useEffect, useState} from "react";
import api from "../../lib/axios.ts";
import toast from "react-hot-toast";
import type {Chapter} from "../../types/chapter.ts";

export default function EditChapter(){
    const {chapterId} = useParams<{ chapterId: string }>();
    const {token, userId} = useAuth();
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    console.log(chapter);
    const handleFinish = async () => {
        if (!chapterId || !chapter) return;

        try {
            setIsLoading(true);

            // Send GET request to finish the chapter on the server
            const response = await api.get(`/chapters/${chapterId}/finish`);

            if (response.status === 200) {
                toast.success("Chapter marked as finished!");
                // Update local chapter content with the updated content from the response
                setChapter({
                    ...chapter,
                    content: response.data.content,
                    finished: true
                });
            } else {
                toast.error("Failed to update chapter.");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update chapter.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConnectParts = async () => {
        if (!chapterId || !chapter) return;

        try {
            setIsLoading(true);

            // First mark chapter as finished by calling handleFinish
            await handleFinish();

            // Then call the connectParts endpoint
            const response = await api.get(`/chapters/${chapterId}/connectParts`);

            if (response.status === 200) {
                // Assuming the response contains updated chapter data
                const updatedChapter = response.data.data;
                setChapter(updatedChapter);
                toast.success("Chapter parts connected successfully!");
            } else {
                toast.error("Failed to connect chapter parts.");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to connect chapter parts.");
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (!token || !chapterId) return;

        (async () => {
            setIsLoading(true);
            setChapter(null);

            try {
                const response = await api.get(`/chapters/${chapterId}`);

                if (response.status === 200) {
                    const fetchedChapter = response.data.data;
                    setChapter(fetchedChapter);

                    // Check ownership
                    console.log(fetchedChapter)
                    if (fetchedChapter.book.ownerId === userId) {
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
    }, [token, chapterId, userId]);

    if (isLoading) {
        return <div>Loading book details...</div>;
    }

    if (!chapter || Object.keys(chapter).length === 0) {
        return <div>No info found for book</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Chapter Title */}
            <h1 className="text-4xl font-bold mb-8">{chapter.title}</h1>

            {/* Chapter Parts */}
            <div className="space-y-6">
                {chapter.chapterParts.length > 0 ? (
                    chapter.chapterParts
                        .slice()
                        .sort((a, b) => a.order - b.order)
                        .map((part, index) => {
                            const canEdit = isOwner || part.authorId === userId;
                            const partUrl = `/chapter-part/${part.id}`;

                            return (
                                <div
                                    className="border rounded p-4 hover:shadow-md transition-shadow duration-200"
                                    key={part.id || index}
                                    style={{ cursor: canEdit ? "pointer" : "default" }}
                                    onClick={() => {
                                        if (canEdit) window.location.href = partUrl;
                                    }}
                                >
                                    <h4 className="font-semibold mb-2">Part {part.order}</h4>
                                    <p className="whitespace-pre-wrap">{part.content}</p>
                                </div>
                            );
                        })
                ) : (
                    <p className="text-gray-500 italic">No parts yet.</p>
                )}
            </div>

            {/* Create New Part Button */}
            <div className="pt-6 text-left">
                <button
                    onClick={() => window.location.href = `/chapter-part/create?chapterId=${chapterId}`}
                    className="px-4 py-2 rounded text-white bg-[#90D1CA] hover:bg-[#5fb6a4] transition duration-200"
                >
                    Create New Part
                </button>
            </div>

            {/* Action Buttons (Owner only) */}
            {isOwner && (
                <div className="flex justify-end gap-4 pt-10">
                    <button
                        onClick={handleFinish}
                        className="px-4 py-2 rounded text-white bg-[#90D1CA] hover:bg-[#5fb6a4] transition duration-200"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleConnectParts}
                        className="px-4 py-2 rounded text-white bg-[#90D1CA] hover:bg-[#5fb6a4] transition duration-200"
                    >
                        Save with AI Enhance
                    </button>
                </div>
            )}
        </div>
    );
}