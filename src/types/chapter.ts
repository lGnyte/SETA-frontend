import type {Book} from "./book.ts";

export interface Chapter {
    id: string;
    bookId: string;
    order: number;
    title: string;
    content: string;
    summary: string;
    deadline: Date;

    book: Book;
    contributors: string[];
    // editRequesters User[];
    // characters     Character[]   @relation("ChapterCharacters")
    // chapterParts   ChapterPart[]
    // tags           Tag[]         @relation("ChapterTags")
}
