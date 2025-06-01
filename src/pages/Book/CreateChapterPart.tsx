import { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../lib/axios.ts";
import toast from "react-hot-toast";
import { useAuth } from "../../lib/auth-context.tsx";

export default function NewChapterPart() {
    const { token, userId } = useAuth();

    const [order, setOrder] = useState(1);
    const [content, setContent] = useState("");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const chapterId = queryParams.get("chapterId");
    const isFormValid = content.trim() !== "";

    const handleSave = async () => {
        if (!token) {
            toast.error("You must be logged in");
            return;
        }
        if (!userId) {
            toast.error("User info missing");
            return;
        }
        if (!chapterId) {
            toast.error("Chapter ID missing");
            return;
        }
        if (!isFormValid) {
            toast.error("Content cannot be empty");
            return;
        }

        try {
            const payload = {
                order, // optional, or default to 1
                content,
                chapter: { connect: { id: Number(chapterId) } },
                author: { connect: { id: userId } }
            };

            const response = await api.post(`/chapters/${chapterId}/parts`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201 || response.status === 200) {
                toast.success("Chapter part created successfully!");
                // Optionally clear form or redirect
                setOrder(order + 1);
                setContent("");
            } else {
                toast.error("Failed to create chapter part.");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to create chapter part.");
        }
    };

    const handleDiscard = () => {
        setOrder(1);
        setContent("");
    };

    return (
        <div className="max-w-xl">
            <h2 className="text-2xl font-semibold mb-6">Create a New Chapter Part</h2>

            <div className="space-y-4">
                {/* Order */}
                <div>
                    <label className="block text-sm font-medium mb-1">Order</label>
                    <input
                        type="number"
                        min={1}
                        value={order}
                        onChange={(e) => setOrder(Number(e.target.value))}
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={6}
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring resize-none"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-4">
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
