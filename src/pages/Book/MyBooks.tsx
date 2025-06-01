import api from "../../lib/axios.ts";
import type {Book} from "../../types/book.ts";
import {useEffect, useState} from "react";
import {useAuth} from "../../lib/auth-context.tsx";
import toast from "react-hot-toast";
import BookCard from "../../components/Book/BookCard.tsx";
import {Link} from "react-router-dom";

export default function MyBooks() {
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        if (!token) return;

        (async () => {
            setIsLoading(true);
            setBooks([]);

            try {
                const response = await api.get('/books/mine', {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });
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
    
    if (isLoading) {
        return <div>Loading books...</div>;
    }

    return (
        <>
            <section className="p-4">
                <h2 className="text-xl font-semibold mb-2">My Books</h2>
                {!books.length && <p className="text-gray-500 italic mb-6">No books found.</p>}
                <Link to={'/book/create'} className={"px-4 py-2 bg-[#90D1CA] hover:bg-[#5fb6a4] text-white font-semibold text-sm rounded-md"}>Create a Book</Link>
                {books.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {books.map((book) => (
                            <div key={book.id}>
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );

}
