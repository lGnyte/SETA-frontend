export interface Book {
    finished: boolean;
    id: string;
    title: string;
    ownerId: string;
    aiEnabled: boolean;
    coverUrl: string;
    createdAt: string;
    updatedAt: string;
    characters: string[];
    chapters: string[];
    tags: string[];
    genres: string[];
    owner: {
        username: string;
    }
}
