import { Book } from "./book";
import { User } from "./user"

export type BookRequest = {
    id: string;
    code: string;
    bookId: Book;
    borrowerId: User;
    bookName: string;
    borrowerName: string;
    transactionStatus: string;
    transactionType: "Issue" | "Reserve";
    fromDate: Date;
    toDate: Date;
    returnDate: Date;
    createdAt: Date;
    updatedAt: Date;
    createdBy: User;
    updatedBy: User;
  };