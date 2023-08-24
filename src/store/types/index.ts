import { 
    Book,
    BookRequest,
    BookCategory,
    User,
} from "../../common"

export type BookState = {
    value: Book[];
}
export type StaffState = {
    value: User[];
}
export type StudetnState = {
    value: User[];
}

export type BookRequestState = {
    value: BookRequest[];
}

export type BookCategoryState = {
    value: BookCategory | null
}