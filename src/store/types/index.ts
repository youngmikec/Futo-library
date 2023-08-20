import { 
    Book,
    BookRequest,
    BookCategory,
} from "../../common"

export type BookState = {
    value: Book[];
}

export type BookRequestState = {
    value: BookRequest[];
}

export type BookCategoryState = {
    value: BookCategory | null
}