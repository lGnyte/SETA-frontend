import {useEffect, useState} from "react";
import api from "../../lib/axios.ts";
import toast from "react-hot-toast";
import {useAuth} from "../../lib/auth-context.tsx";

export default function CreateBookForm() {
    const {token} = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [aiEnabled, setAiEnabled] = useState("false");
    const [genres, setGenres] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [coverUrl, setCoverImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedTags, setFetchedTags] = useState<string[]>([]);
    const [fetchedGenres, setFetchedGenres] = useState<string[]>([]);

    const isFormValid = title.trim() !== "" && description.trim() !== "";

    const handleMultiSelect = (
        selected: string,
        setFunc: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        setFunc((prev) =>
            prev.includes(selected)
                ? prev.filter((item) => item !== selected)
                : [...prev, selected]
        );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        const data = {
            title,
            description,
            aiEnabled,
            genres,
            tags,
            coverUrl,
        };
        
        console.log(data);
        
        // You can send `data` to your API here
    };

    const handleDiscard = () => {
        setTitle("");
        setDescription("");
        setAiEnabled("false");
        setGenres([]);
        setTags([]);
        setCoverImage(null);
        setImagePreview(null);
    };

    useEffect(() => {
        if (!token) return;

        (async () => {
            setIsLoading(true);
            setFetchedTags([]);

            try {
                let response = await api.get('/tags');
                if (response.status === 200) {
                    if (response.data.data && response.data.data.length > 0) {
                        setFetchedTags(response.data.data);
                    }
                }
                response = await api.get('/genres');
                if (response.status === 200) {
                    if (response.data.data && response.data.data.length > 0) {
                        setFetchedGenres(response.data.data);
                    }
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
    }, [token]);
    
    if (isLoading || !fetchedGenres || !fetchedTags) {
        return <div>Please wait...</div>
    }

    return (
        <div className="max-w-xl">
            <h2 className="text-2xl font-semibold mb-6">Create a New Book</h2>

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
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring resize-none"
                    />
                </div>

                {/* AI Enabled */}
                <div>
                    <label className="block text-sm font-medium mb-1">AI Enabled</label>
                    <select
                        value={aiEnabled}
                        onChange={(e) => setAiEnabled(e.target.value)}
                        className="w-full border rounded px-4 py-2"
                    >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>

                {/* Genres Multi-select */}
                <div>
                    <label className="block text-sm font-medium mb-1">Genres</label>
                    <div className="flex flex-wrap gap-2 border rounded px-4 py-2">
                        {fetchedGenres.map((genre) => (
                            <button
                                key={genre}
                                type="button"
                                onClick={() => handleMultiSelect(genre, setGenres)}
                                className={`px-2 py-1 rounded text-sm transition ${
                                    genres.includes(genre)
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tags Multi-select */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tags</label>
                    <div className="flex flex-wrap gap-2 border rounded px-4 py-2">
                        {fetchedTags.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => handleMultiSelect(tag, setTags)}
                                className={`px-2 py-1 rounded text-sm transition ${
                                    tags.includes(tag)
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cover Image Upload */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Optional: Upload Book Cover
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full"
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Cover preview"
                            className="mt-2 w-32 h-auto rounded shadow"
                        />
                    )}
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
