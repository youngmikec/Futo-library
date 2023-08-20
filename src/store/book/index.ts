import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../common";
import { BookState } from "../types";

const initialState: BookState = {
    value: [],
}

export const bookSlice = createSlice({
    name: "booksState",
    initialState,
    reducers: {
        INITIALIZE_BOOKS: (state, action: PayloadAction<Book[]>) => {
            state.value = action.payload;
        },
        ADD_TO_BOOkS: (state, action: PayloadAction<Book>) => {
            const { value } = state;
            state.value = [action.payload, ...value];
        },
        UPDATE_BOOk_STATE: (state, action: PayloadAction<Book>) => {
            for(let i = 0; i < state.value.length; i++){
                if(state.value[i]._id === action.payload._id){
                    state.value[i] = action.payload;
                    break;
                }
            }
        },
        REMOVE_BOOk: (state, action: PayloadAction<string>) => {
            const newState: Book[] = state.value.filter((item: Book) => item._id !== action.payload);
            state.value = [...newState];
        }
    }
})

export const { INITIALIZE_BOOKS, ADD_TO_BOOkS, UPDATE_BOOk_STATE, REMOVE_BOOk } = bookSlice.actions;

export default bookSlice.reducer;