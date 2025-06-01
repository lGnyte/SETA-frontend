import {useEffect, useState} from "react";
import api from "../../lib/axios.ts";
import toast from "react-hot-toast";
import {useParams} from "react-router-dom";
import {useAuth} from "../../lib/auth-context.tsx";
import type {Chapter} from "../../types/chapter.ts";

export default function BookChapterReaderPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { token, userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  
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
    return <div>Loading...</div>
  }
  
  if (!chapter) {
    return <div>No data</div>
  }
  
  return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Book Info (left) */}
        <div className="bg-white p-6 rounded shadow col-span-1 h-fit">
          <div className="flex justify-center mb-4">
            <img
                src={chapter.book.coverUrl || '/placeholder-book-cover.png'}
                alt="Book Cover"
                className="w-48 h-auto shadow-md rounded"
            />
          </div>

          <h1 className="text-xl font-bold mb-1 text-center">{chapter.book.title}</h1>
          <p className="text-gray-600 text-center mb-4">
            By @user1
          </p>

          <p className="text-sm text-gray-700 leading-relaxed text-justify">
            {chapter.book.description || 'No description provided.'}
          </p>
        </div>

        {/* Chapter Content (right) */}
        <div className="bg-white p-6 rounded shadow col-span-2 h-[80vh] flex flex-col">
          {/* Titlul & Contributors - fix sus */}
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            <p className="text-sm text-gray-500">
              Contributors:{' '}
              {chapter.contributors.length > 0
                  ? chapter.contributors.map((c) => c.username).join(', ')
                  : 'None'}
            </p>
          </div>

          <div className="overflow-y-auto pr-2" style={{ flex: 1 }}>
            <div className="whitespace-pre-line text-gray-800 leading-relaxed text-base">
              {chapter.content}
            </div>
          </div>
        </div>
      </div>

  );
}
