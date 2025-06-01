import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../lib/axios.ts";
import toast from "react-hot-toast";
import {useAuth} from "../../lib/auth-context.tsx";


export default function NewChapter() {
    const { token} = useAuth();
    const navigate = useNavigate();
    const {bookId} = useParams<{ bookId: string }>();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [order, setOrder] = useState(1);
    const isFormValid = title.trim() !== "";

    const handleSave = async () => {
        const data = {
            title,
            content,
            order
        };

        try {
            await api.post(`/books/${bookId}/chapters`, data);
            toast.success("Chapter created successfully!");
            navigate(`/book/${bookId}`);
        } catch (error: any) {
            console.error("Failed to create chapter:", error);
            toast.error(error.response?.data?.message || "Failed to create chapter.");
        }
    };

    const handleEnhanceDescription = async () => {
        const data = {
            keywords:content
        }

        console.log(data);
        try {
            const response = await api.post(`/ai/plot-idea`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
            setContent(response.data.plotIdea)
        } catch (error: any) {
            console.error("Failed to enhance chapter:", error);
            toast.error(error.response?.data?.message || "Failed to enhance chapter.");
        }
    }

    const handleDiscard = () => {
        setTitle("");
        setContent("");
        setOrder(0);
    };

    return (
        <div className="max-w-xl">
            <h2 className="text-2xl font-semibold mb-6">Create a New Chapter</h2>

            <div className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring resize-none"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        onClick={handleEnhanceDescription}
                        className={`px-4 py-2 rounded text-white transition duration-200 ${
                            content?.length > 0
                                ? "bg-[#90D1CA] hover:bg-[#5fb6a4]"
                                : "bg-gray-300 cursor-not-allowed"
                        }`}
                    >
                        AI Enhance
                    </button>
                    <button
                        onClick={handleDiscard}
                        className="px-4 py-2 bg-[#E8AD91] hover:bg-[#d1917a] text-white rounded transition duration-200"
                    >
                        Discard
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!isFormValid}
                        className={`px-4 py-2 rounded text-white transition duration-200 ${
                            isFormValid
                                ? "bg-[#90D1CA] hover:bg-[#5fb6a4]"
                                : "bg-gray-300 cursor-not-allowed"
                        }`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
