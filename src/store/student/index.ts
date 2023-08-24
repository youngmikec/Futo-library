import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../common";
import { StudetnState } from "../types";

const initialState: StudetnState = {
    value: [],
}

export const studentSlice = createSlice({
    name: "studentsState",
    initialState,
    reducers: {
        INITIALIZE_STUDENT: (state, action: PayloadAction<User[]>) => {
            state.value = action.payload;
        },
        ADD_TO_STUDENT: (state, action: PayloadAction<User>) => {
            const { value } = state;
            state.value = [action.payload, ...value];
        },
        UPDATE_STUDENT_STATE: (state, action: PayloadAction<User>) => {
            for(let i = 0; i < state.value.length; i++){
                if(state.value[i]._id === action.payload._id){
                    state.value[i] = action.payload;
                    break;
                }
            }
        },
        REMOVE_STUDENT: (state, action: PayloadAction<string>) => {
            const newState: User[] = state.value.filter((item: User) => item._id !== action.payload);
            state.value = [...newState];
        }
    }
})

export const { INITIALIZE_STUDENT, ADD_TO_STUDENT, UPDATE_STUDENT_STATE, REMOVE_STUDENT } = studentSlice.actions;

export default studentSlice.reducer;