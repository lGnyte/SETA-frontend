import type {Book} from "./book.ts";
import type {Tag} from "./tag.ts";
import type {Contributor} from "./contributor.ts";
import type {ChapterPart} from "./chapterPart.ts";

export interface Chapter {
    id: string;
    bookId: string;
    order: number;
    title: string;
    content: string;
    summary: string;
    deadline: Date;
    finished: boolean;

    book: Book;
    contributors: Contributor[];
    chapterParts: ChapterPart[];
    // characters     Character[]   @relation("ChapterCharacters")
    // chapterParts   ChapterPart[]
    tag: Tag[];
}
