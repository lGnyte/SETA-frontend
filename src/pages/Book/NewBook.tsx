import { useEffect, useState } from "react";
import api from "../../lib/axios.ts";
import toast from "react-hot-toast";
import { useAuth } from "../../lib/auth-context.tsx";
import { useNavigate } from 'react-router-dom';


export default function CreateBookForm() {
  const { token, userId } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [aiEnabled, setAiEnabled] = useState("false");
  // const [tags, setTags] = useState<string[]>([]);
  const [coverUrl, setCoverImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedGenres, setFetchedGenres] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const isFormValid = title.trim() !== "" && description.trim() !== "";
  const [newTagName, setNewTagName] = useState("");
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const [fetchedTags, setFetchedTags] = useState<string[]>([]);
  const createTag = async () => {
    if (!newTagName.trim()) {
      toast.error("Please enter a tag name.");
      return;
    }

    setIsCreatingTag(true);
    try {
      const response = await api.post("/tags", { name: newTagName.trim() });
      if (response.status === 201 || response.status === 200) {
        // Assuming response.data contains the created tag (string or object)
        const createdTag = response.data.name || response.data;

        // Add to fetchedTags list
        setFetchedTags((prev) => [...prev, createdTag]);

        // Optionally auto-select the new tag
        // setTags(prev => [...prev, createdTag]);

        toast.success("Tag created successfully!");
        setNewTagName(""); // Clear input
      } else {
        toast.error("Failed to create tag.");
      }
    } catch (error) {
      toast.error("Error creating tag." + error);
    } finally {
      setIsCreatingTag(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!token) {
      toast.error("You must be logged in");
      return;
    }
    if (!userId) {
      toast.error("User info missing");
      return;
    }

    try {
      let uploadedCoverUrl = null;
      if (coverUrl) {
        // Upload file logic here (e.g., to S3 or your server)
        // For now, assume placeholder URL
        uploadedCoverUrl = "https://example.com/your-uploaded-image.jpg";
      }

      const payload = {
        title,
        description,
        ownerId: userId,
        aiEnabled: aiEnabled === "true",
        genres: selectedGenre
          ? {
              connect: [{ id: selectedGenre }],
            }
          : {},
        // tags,
        coverUrl: uploadedCoverUrl,
      };

      const response = await api.post("/books", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Book created successfully!");
        navigate(`/book/user/${userId}`);
      } else {
        toast.error("Failed to create book.");
      }
    } catch (error) {
      toast.error(
        "Error: " + (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };
  const handleDiscard = () => {
    setTitle("");
    setDescription("");
    setAiEnabled("false");
    setSelectedGenre(null);
    // setTags([]);
    setCoverImage(null);
    setImagePreview(null);
  };

  useEffect(() => {
    if (!token) return;

    (async () => {
      setIsLoading(true);
      setFetchedTags([]);

      try {
        let response = await api.get("/tags");
        if (response.status === 200) {
          if (response.data.data && response.data.data.length > 0) {
            setFetchedTags(response.data.data);
          }
        }
        response = await api.get("/genres");
        if (response.status === 200) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            setFetchedGenres(response.data);
          } else if (response.data.data && Array.isArray(response.data.data)) {
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
    return <div>Please wait...</div>;
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
          <label className="block text-sm font-medium mb-1">Genre</label>
          <select
            value={selectedGenre || ""}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedGenre(value ? Number(value) : null);
            }}
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Select a genre</option>
            {fetchedGenres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Add New Tag</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="flex-grow border rounded px-4 py-2 focus:outline-none focus:ring"
              placeholder="Enter new tag name"
              disabled={isCreatingTag}
            />
            <button
              type="button"
              onClick={createTag}
              disabled={isCreatingTag || !newTagName.trim()}
              className="px-4 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition disabled:opacity-50"
            >
              {isCreatingTag ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Created Tags:
          </label>
          {fetchedTags.length === 0 ? (
            <p className="text-gray-500">No tags created yet.</p>
          ) : (
            <ul className="list-disc list-inside">
              {fetchedTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
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
            className="px-4 py-2 cursor-pointer bg-[#E8AD91] hover:bg-[#d1917a] text-white rounded transition duration-200"
          >
            Discard
          </button>
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className={`px-4 py-2 rounded text-white transition duration-200 ${
              isFormValid
                ? "bg-[#90D1CA] cursor-pointer hover:bg-[#5fb6a4]"
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
