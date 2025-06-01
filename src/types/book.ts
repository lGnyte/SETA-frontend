import type {Chapter} from "./chapter.ts";
import type {Genre} from "./genre.ts";
import type {Tag} from "./tag.ts";

export interface Book {
    finished: boolean;
    id: string;
    title: string;
    description: string;
    ownerId: string;
    aiEnabled: boolean;
    coverUrl: string;
    createdAt: string;
    updatedAt: string;
    characters: string[];
    chapters: Chapter[];
    tags: Tag[];
    genres: Genre[];
    owner: {
        username: string;
    }
}
