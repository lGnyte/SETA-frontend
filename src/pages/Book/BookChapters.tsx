const isOwner = true; // change this to false to simulate non-owner view

const book = {
    title: "The Enigmatic Expedition",
    author: "Amelia Stone",
    description:
        "Embark on a thrilling journey through uncharted territories, where ancient mysteries and modern-day adventurers collide. This collaborative novel invites you to shape the narrative, unravel secrets, and explore the unknown.",
    requestsCount: 32,
    coverImage: "/path/to/book-cover.png", // Replace with actual path
    chapters: [
        {
            title: "Chapter 1: The Discovery",
            snippet:
                "In the heart of the Amazon rainforest, a team of explorers stumbles upon an ancient artifact...",
        },
        {
            title: "Chapter 2: The Enigma Deepens",
            snippet:
                "As the explorers delve deeper into the mystery, they encounter cryptic clues and face perilous challenges...",
        },
        {
            title: "Chapter 3: Crossroads of Destiny",
            snippet:
                "The expedition reaches a critical juncture, where alliances are tested and the path forward remains uncertain...",
        },
    ],
};

export default function BookOverviewPage() {
    return (
        <div className="p-6">
            <div className="bg-white p-10 relative">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between gap-10">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                        <p className="text-[#5fb6a4] mb-4">By {book.author}</p>
                        <p className="text-gray-700 mb-6">{book.description}</p>

                        {/* Owner vs Non-owner */}
                        {isOwner ? (
                            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
                                <p className="font-semibold flex justify-center">
                                    {book.requestsCount} users have requested to contribute to this book
                                </p>
                                <div className="mt-2 flex justify-center">
                                    <button className="px-4 py-2 bg-[#90D1CA] hover:bg-[#5fb6a4] text-white font-semibold text-sm rounded-md">
                                        View and manage requests
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-6">
                                <button className="px-4 py-2 bg-[#90D1CA] hover:bg-[#5fb6a4] text-white font-semibold text-sm rounded-md">
                                    Request to Collaborate
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Book Cover */}
                    <div className="flex justify-center md:justify-end">
                        <img
                            src={book.coverImage}
                            alt="Book Cover"
                            className="w-48 h-auto shadow-md"
                        />
                    </div>
                </div>

                {/* Chapters Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-6">Chapters</h2>

                    <div className="space-y-8">
                        {book.chapters.map((chapter, index) => (
                            <div key={index}>
                                <h3 className="font-semibold mb-1">{chapter.title}</h3>
                                <p className="text-gray-600 mb-2">{chapter.snippet}</p>
                                <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md">
                                    See more
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
