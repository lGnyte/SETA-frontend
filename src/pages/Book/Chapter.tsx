import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../lib/axios.ts";
import toast from "react-hot-toast";
import type {Chapter} from "../../types/chapter.ts";

export default function Chapter(){
    const {chapterId} = useParams<{ chapterId: string }>();
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
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
    },[]);

    if (isLoading) {
        return <div>Loading book details...</div>;
    }

    if (!chapter || Object.keys(chapter).length === 0) {
        return <div>No info found for book</div>;
    }

    // @ts-ignore
    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Chapter Title */}
            <h1 className="text-4xl font-bold mb-8 text-left">{chapter.title}</h1>

            {/* Full Chapter Content */}
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed bg-white border border-gray-200 rounded-xl p-10 shadow-sm text-left">
                {chapter.content}
            </div>
        </div>
    );

}