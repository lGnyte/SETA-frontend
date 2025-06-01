import type {Book} from "../../types/book.ts";
import {Link} from "react-router-dom";

const BookCard = ({ book } : {book: Book}) => {
    const {
        id,
        title,
        description,
        coverUrl,
        finished,
        aiEnabled,
        createdAt,
        genres,
        tags,
        chapters,
        characters,
        owner,
    } = book;
    
    return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col">
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            {coverUrl ? (
                <img
                    src={coverUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            ) : (
                <span className="text-gray-400 text-sm">No Cover</span>
            )}
        </div>

        <div className="p-4 flex flex-col gap-2">
            <Link to={`/book/${id}`} className="text-lg font-semibold text-gray-800">{title}</Link>
            <p className="text-sm text-gray-600">by @<span className="font-medium">{owner.username}</span></p>

            <p className="text-sm text-gray-700 line-clamp-3">{description || 'No description provided.'}</p>

            <div className="text-xs text-gray-500 mt-2 space-y-1">
                <p><span className="font-semibold">Genres:</span> {genres?.map(g => g.name).join(', ') || 'N/A'}</p>
                <p><span className="font-semibold">Tags:</span> {tags?.map(t => t.name).join(', ') || 'None'}</p>
                <p><span className="font-semibold">Chapters:</span> {chapters?.length || 0}</p>
                <p><span className="font-semibold">Characters:</span> {characters?.length || 0}</p>
                <p><span className="font-semibold">Status:</span> {finished ? 'Finished' : 'In Progress'}</p>
                <p><span className="font-semibold">AI Enabled:</span> {aiEnabled ? 'Yes' : 'No'}</p>
                <p><span className="font-semibold">Created:</span> {new Date(createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    </div>
    )
}

export default BookCard;
