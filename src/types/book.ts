import type {Chapter} from "./chapter.ts";

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
    tags: string[];
    genres: string[];
    owner: {
        username: string;
    }
}
