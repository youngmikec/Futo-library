import { Book } from "./book";
import { User } from "./user";

export type BookCategory = {
    id: string;
    code: string;
    categoryName: string;
    books: Book[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: User;
    updatedBy: User;
}