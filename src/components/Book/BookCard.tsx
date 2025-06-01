import type {Book} from "../../types/book.ts";

const BookCard = ({ book } : {book: Book}) => (
    <div className="bg-white rounded shadow p-4 border-2 border-gray-300 max-w-[400px]">
        <img src={book.coverUrl} alt={book.title} className="w-full h-48 object-cover rounded" />
        <h3 className="mt-2 text-lg font-semibold">{book.title}</h3>
        <p className="text-gray-600">{book.owner.username}</p>
        <span>{book.finished ? "Finished" : "Not finished"}</span>
    </div>
);

export default BookCard;
