import api from "../../lib/axios.ts";
import type {Book} from "../../types/book.ts";
import BookCard from "./BookCard.tsx";
import {useEffect, useState} from "react";
import {useAuth} from "../../lib/auth-context.tsx";
import toast from "react-hot-toast";

export default function BookCarousel() {
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        if (!token) return;

        (async () => {
            setIsLoading(true);
            setBooks([]);

            try {
                const response = await api.get('/books');
                if (response.status === 200) {
                    setBooks(response.data.data);
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

    const [longestBooks, setLongestBooks] = useState<Book[]>([]);
    // const [lastOpenBooks, setLastOpenBooks] = useState<Book[]>([]);
    const [latestFinishedBooks, setLatestFinishedBooks] = useState<Book[]>([]);

    useEffect(() => {
        if (!books || books.length === 0) return;

        // Longest books: by chapter count
        const longest = [...books]
            .filter(book => Array.isArray(book.chapters))
            .sort((a, b) => (b.chapters.length || 0) - (a.chapters.length || 0))
            .slice(0, 3);

        // Last open: unfinished books with a future deadline
        // const now = new Date();
        // const lastOpen = books
        //     .filter(book => !book.finished && book.deadline && new Date(book.deadline) > now)
        //     .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        //     .slice(0, 3);

        // Latest finished: finished books sorted by latest updated
        const latestFinished = books
            .filter(book => book.finished)
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .slice(0, 3);

        setLongestBooks(longest);
        // setLastOpenBooks(lastOpen);
        setLatestFinishedBooks(latestFinished);
    }, [books]);


    if (isLoading) {
        return <div>Loading books...</div>;
    }

    if (!books || books.length === 0) {
        return <div>No books found.</div>;
    }

    return (
        <>
            <section className="p-4">
                <h2 className="text-xl font-semibold mb-2">Longest Books</h2>
                {longestBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {longestBooks.map((book) => (
                            <div key={book.id}>
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No books with chapters found.</p>
                )}
            </section>

            <section className="p-4">
                <h2 className="text-xl font-semibold mb-2">Recently Finished Books</h2>
                {latestFinishedBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {latestFinishedBooks.map((book) => (
                            <div key={book.id}>
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No finished books found.</p>
                )}
            </section>

            {/*<section className="p-4">*/}
            {/*    <h2 className="text-xl font-semibold mb-2">📅 Still in Progress (Upcoming Deadlines)</h2>*/}
            {/*    {lastOpenBooks.length > 0 ? (*/}
            {/*        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">*/}
            {/*            {lastOpenBooks.map((book) => (*/}
            {/*                <div key={book.id}>*/}
            {/*                    <BookCard book={book} />*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <p className="text-gray-500 italic">No upcoming or active books with deadlines.</p>*/}
            {/*    )}*/}
            {/*</section>*/}
        </>
    );

}
