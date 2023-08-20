import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BookRequest } from "../../common";
import { BookRequestState } from "../types";

const initialState: BookRequestState = {
    value: [],
}

export const bookRequestSlie = createSlice({
    name: "bookRequestState",
    initialState,
    reducers: {
        INITIALIZE_BOOK_REQUESTS: (state, action: PayloadAction<BookRequest[]>) => {
            state.value = action.payload;
        },
        ADD_TO_BOOK_REQUESTS: (state, action: PayloadAction<BookRequest>) => {
            const { value } = state;
            state.value = [action.payload, ...value];
        },
        UPDATE_BOOK_REQUEST_STATE: (state, action: PayloadAction<BookRequest>) => {
            for(let i = 0; i < state.value.length; i++){
                if(state.value[i]._id === action.payload._id){
                    state.value[i] = action.payload;
                    break;
                }
            }
        },
        REMOVE_BOOK_REQUEST: (state, action: PayloadAction<string>) => {
            const newState: BookRequest[] = state.value.filter((item: BookRequest) => item._id !== action.payload);
            state.value = [...newState];
        }
    }
})

export const { INITIALIZE_BOOK_REQUESTS, ADD_TO_BOOK_REQUESTS, UPDATE_BOOK_REQUEST_STATE, REMOVE_BOOK_REQUEST } = bookRequestSlie.actions;

export default bookRequestSlie.reducer;