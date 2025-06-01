import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// book
const mockBook = {
  id: 1,
  title: "The Journey of Echo",
};

// characters
const mockCharacters = [
  {
    id: 1,
    name: "Lyra",
    description: "A fearless explorer with a mysterious past.",
    traits: ["Brave", "Rebellious"],
    imageUrl: "https://hackathon31052025.blob.core.windows.net/storytellingblob/avatars/7eeb949e-6825-4b82-8d9e-4806568c877a.png",
  },
  {
    id: 2,
    name: "Caelum",
    description: "The thoughtful scholar of the realm, with a surprising hobby.",
    traits: ["Wise", "Loyal"],
    imageUrl: "https://hackathon31052025.blob.core.windows.net/storytellingblob/avatars/48590f7b-fd7f-48af-bca5-cf99f8ba1d92.png",
  },
  {
    id: 3,
    name: "Vex",
    description: "A pure and gentle princess, daughter of the king",
    traits: ["Cunning", "Chaotic"],
    imageUrl: "https://hackathon31052025.blob.core.windows.net/storytellingblob/avatars/1e2d1038-ae74-47cb-b836-2979dc83c982.png",
  },
];

export default function BookCharactersPage() {
  const { bookId } = useParams<{ bookId: string }>();

  const [book, setBook] = useState(mockBook);
  const [characters, setCharacters] = useState(mockCharacters);

  useEffect(() => {
    setBook(mockBook);
    setCharacters(mockCharacters);
  }, [bookId]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Characters from <span className="text-[#5fb6a4]">{book.title}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {characters.map((char) => (
          <div
            key={char.id}
            className="bg-white border rounded-lg shadow p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition"
          >
            <img
              src={
                char.imageUrl ||"https://placehold.co/200x200?text=Vex"
              }
              alt={char.name}
              className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-lg border mx-auto md:mx-0"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">{char.name}</h2>
              <p className="text-gray-700 mb-3">{char.description}</p>
              <div className="flex flex-wrap gap-2">
                {char.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded-full text-gray-700"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
