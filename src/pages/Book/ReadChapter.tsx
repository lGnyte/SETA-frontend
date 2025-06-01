const mockBook = {
  title: "The Journey of Echo",
  description:
    "A fantasy novel about a forgotten land full of magic and memory.",
  coverUrl: "https://placehold.co/200x300",
  owner: {
    username: "ana",
  },
};

const mockChapter = {
  title: "Whispers in the Fog",
  content: `
The mist curled around her ankles like silent questions.

Each step forward felt like diving into memory.

"Do you remember me?" the voice asked, though no lips moved.

She didn’t.

But she lied.

--- 

She pressed on. The fog whispered truths she couldn't face.

The sky cracked with a soundless thunder. It wasn't real. None of it was.

Yet every part of it felt like home.

---

Something shimmered in the distance. A lantern? A trap?

Her heart beat like war drums in her chest.

Still, she walked.

---

The voice returned, this time behind her. "You shouldn't have come."

She turned. Nothing.

Only the fog. And the cold. And the guilt.

---

`, // poți adăuga de câte ori vrei text aici
  contributors: [
    { username: "ana" },
    { username: "johnny" },
    { username: "larisa" },
  ],
};

export default function BookChapterReaderPage() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Book Info (left) */}
      <div className="bg-white p-6 rounded shadow col-span-1 h-fit">
        <div className="flex justify-center mb-4">
          <img
            src={mockBook.coverUrl}
            alt="Book Cover"
            className="50 h-auto shadow-md rounded"
          />
        </div>

        <h1 className="text-xl font-bold mb-1 text-center">{mockBook.title}</h1>
        <p className="text-gray-600 text-center mb-4">
          By {mockBook.owner.username}
        </p>

        <p className="text-sm text-gray-700 leading-relaxed text-justify">
          {mockBook.description.repeat(3)} {/* simulează descriere lungă */}
        </p>
      </div>

      {/* Chapter Content (right) */}
      <div className="bg-white p-6 rounded shadow col-span-2 h-[80vh] flex flex-col">
        {/* Titlul & Contributors - fix sus */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">{mockChapter.title}</h2>
          <p className="text-sm text-gray-500">
            Contributors:{" "}
            {mockChapter.contributors.map((c) => c.username).join(", ")}
          </p>
        </div>

        {/* Content - scrollabil */}
        <div className="overflow-y-auto pr-2" style={{ flex: 1 }}>
          <div className="whitespace-pre-line text-gray-800 leading-relaxed text-base">
            {mockChapter.content}
          </div>
        </div>
      </div>
    </div>
  );
}
