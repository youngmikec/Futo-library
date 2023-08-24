import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../common";
import { StaffState } from "../types";

const initialState: StaffState = {
    value: [],
}

export const staffSlice = createSlice({
    name: "staffsState",
    initialState,
    reducers: {
        INITIALIZE_STAFF: (state, action: PayloadAction<User[]>) => {
            state.value = action.payload;
        },
        ADD_TO_STAFF: (state, action: PayloadAction<User>) => {
            const { value } = state;
            state.value = [action.payload, ...value];
        },
        UPDATE_STAFF_STATE: (state, action: PayloadAction<User>) => {
            for(let i = 0; i < state.value.length; i++){
                if(state.value[i]._id === action.payload._id){
                    state.value[i] = action.payload;
                    break;
                }
            }
        },
        REMOVE_STAFF: (state, action: PayloadAction<string>) => {
            const newState: User[] = state.value.filter((item: User) => item._id !== action.payload);
            state.value = [...newState];
        }
    }
})

export const { INITIALIZE_STAFF, ADD_TO_STAFF, UPDATE_STAFF_STATE, REMOVE_STAFF } = staffSlice.actions;

export default staffSlice.reducer;