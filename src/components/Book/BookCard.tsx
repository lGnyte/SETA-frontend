import type {Book} from "../../types/book.ts";
import {Link} from "react-router-dom";

const BookCard = ({ book } : {book: Book}) => (
    <div className="bg-white rounded shadow p-4 border-2 border-gray-300 max-w-[400px]">
        <img src={book.coverUrl} alt={book.title} className="w-full h-48 object-cover rounded" />
        <Link to={`/book/${book.id}`} className="mt-2 text-lg font-semibold">{book.title}</Link>
        <p className="text-gray-600">{book.owner.username}</p>
        <span>{book.finished ? "Finished" : "Not finished"}</span>
    </div>
);

export default BookCard;
