import { useState, useEffect } from "react";

const mockBook = {
  title: "The Journey of Echo",
  description:
    "A fantasy novel about a forgotten land full of magic and memory. The story explores the boundaries of identity and memory through a heroine lost in a time-bent realm. A fantasy novel about a forgotten land full of magic and memory. The story explores the boundaries of identity and memory through a heroine lost in a time-bent realm.A fantasy novel about a forgotten land full of magic and memory. The story explores the boundaries of identity and memory through a heroine lost in a time-bent realm.A fantasy novel about a forgotten land full of magic and memory. The story explores the boundaries of identity and memory through a heroine lost in a time-bent realm.",
  coverUrl: "https://placehold.co/200x300",
  owner: {
    username: "ana",
  },
};

export default function CreateCharacterPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTrait, setSelectedTrait] = useState<string | null>(null);
  const [traits, setTraits] = useState<string[]>([]);
  const isFormValid = name.trim() !== "" && description.trim() !== "";

  useEffect(() => {
    // simulate fetching traits
    setTimeout(() => {
      setTraits(["Brave", "Cunning", "Loyal", "Rebellious", "Wise"]);
    }, 300);
  }, []);

  const handleSave = () => {
    if (!isFormValid) return;

    const payload = {
      name,
      description,
      trait: selectedTrait,
    };

    console.log("Character created:", payload);
    alert("Character created with trait: " + selectedTrait);
    handleDiscard();
  };

  const handleDiscard = () => {
    setName("");
    setDescription("");
    setSelectedTrait(null);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Book Info (Left) */}
      <div className="bg-white p-6 rounded shadow col-span-1 h-fit">
        <div className="flex justify-center mb-4">
          <img
            src={mockBook.coverUrl}
            alt="Book Cover"
            className="w-32 h-auto shadow-md rounded"
          />
        </div>
        <h1 className="text-xl font-bold mb-1 text-center">{mockBook.title}</h1>
        <p className="text-gray-600 text-center mb-4">
          By {mockBook.owner.username}
        </p>
        <p className="text-sm text-gray-700 leading-relaxed text-justify">
          {mockBook.description}
        </p>
      </div>

      {/* Create Character Form (Right) */}
      <div className="bg-white p-6 rounded shadow col-span-2">
        <h2 className="text-2xl font-semibold mb-6">Add New Character</h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Character Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring resize-none"
            />
          </div>

          {/* Trait Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Trait</label>
            <select
              value={selectedTrait || ""}
              onChange={(e) => setSelectedTrait(e.target.value)}
              className="w-full border rounded px-4 py-2"
            >
              <option value="">Select a trait</option>
              {traits.map((trait) => (
                <option key={trait} value={trait}>
                  {trait}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={handleDiscard}
              className="px-4 py-2 bg-[#E8AD91] hover:bg-[#d1917a] text-white rounded hover:bg-gray-400"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              disabled={!isFormValid}
              className={`px-4 py-2 text-white rounded transition ${
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
    </div>
  );
}
