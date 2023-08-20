import { BookCategory } from "./book-category";
import { BookRequest } from "./book-request";
import { User } from "./user";

export type Book = {
  id: string;
  _id: string;
  code: string;
  bookImg: string;
  bookName: string;
  bookStatus: string;
  publisher: string;
  language: string;
  author: string;
  alternateTitle: string;
  bookCountAvailable: number;
  categories: BookCategory[];
  transactions: BookRequest[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
  updatedBy: User;
};
