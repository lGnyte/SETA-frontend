import { useState } from "react";

const currentUser = "Olivia";
const isAdmin = false;

interface Section {
    author: string;
    content: string;
    saved: boolean;
}

const initialChapter = {
    title: "Capitolul 4: Răscrucea",
    collaborators: ["Michael", "Olivia", "Noah"],
    sections: [
        { author: "Michael", content: "Textul lui Michael...", saved: true },
        { author: "Noah", content: "Partea lui Noah...", saved: true },
    ],
};

export default function EditChapterPage() {
    const [title, setTitle] = useState(initialChapter.title);
    const [sections, setSections] = useState<Section[]>(initialChapter.sections);

    const userSection = sections.find((s) => s.author === currentUser);

    const handleAddSection = () => {
        if (!userSection) {
            setSections((prev) => [
                ...prev,
                {
                    author: currentUser,
                    content: "",
                    saved: false,
                },
            ]);
        }
    };

    const handleSectionChange = (text: string) => {
        setSections((prev) =>
            prev.map((s) =>
                s.author === currentUser ? { ...s, content: text, saved: false } : s
            )
        );
    };

    const handleSaveMySection = () => {
        setSections((prev) =>
            prev.map((s) =>
                s.author === currentUser ? { ...s, saved: true } : s
            )
        );
        console.log("Section saved!");
    };

    const handleSaveAll = () => {
        console.log("Admin saves all.", { title, sections });
        // Salvează tot capitolul
    };

    const userCanAdd = !userSection; // nu are deloc secțiune

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
            <h2 className="text-2xl font-semibold mb-4">Contribute to Chapter</h2>

            {/* Titlu */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Titlu</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
                />
            </div>

            {/* Colaboratori */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Colaboratori</label>
                <ul className="list-disc list-inside text-gray-700 text-sm pl-2">
                    {initialChapter.collaborators.map((name) => (
                        <li key={name}>{name}</li>
                    ))}
                </ul>
            </div>

            {/* Secțiuni existente */}
            <div className="space-y-6 mb-8">
                {sections.map((section, index) => (
                    <div key={index}>
                        <label className="block font-medium text-sm mb-1">
                            Section written by {section.author}
                        </label>
                        <textarea
                            value={section.content}
                            onChange={(e) =>
                                section.author === currentUser
                                    ? handleSectionChange(e.target.value)
                                    : undefined
                            }
                            readOnly={section.author !== currentUser}
                            className={`w-full border rounded px-4 py-2 resize-none min-h-[100px] ${
                                section.author === currentUser
                                    ? "bg-white focus:outline-none focus:ring"
                                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                        />
                        {section.author === currentUser && !section.saved && (
                            <button
                                onClick={handleSaveMySection}
                                className="mt-2 px-4 py-2 bg-[#90D1CA] hover:bg-[#5fb6a4] text-white rounded"
                            >
                                Save section
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Buton pentru adăugare secțiune */}
            {userCanAdd && (
                <button
                    onClick={handleAddSection}
                    className="mb-8 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                    Add section
                </button>
            )}

            {/* Admin only: salvează tot */}
            {isAdmin && (
                <div className="flex justify-end">
                    <button
                        onClick={handleSaveAll}
                        className="px-4 py-2 bg-[#90D1CA] hover:bg-[#5fb6a4] text-white rounded"
                    >
                        Save all sections
                    </button>
                </div>
            )}
        </div>
    );
}
