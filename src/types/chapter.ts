import type {Book} from "./book.ts";
import type {ChapterPart} from "./chapterPart.ts";

export interface Chapter {
    id: string;
    bookId: string;
    order: number;
    title: string;
    content: string;
    summary: string;
    deadline: Date;
    isFinished: boolean;

    book: Book;
    contributors: string[];
    chapterParts: ChapterPart[];
    // editRequesters User[];
    // characters     Character[]   @relation("ChapterCharacters")
    // chapterParts   ChapterPart[]
    // tags           Tag[]         @relation("ChapterTags")
}
