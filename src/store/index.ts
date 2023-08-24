import { configureStore } from "@reduxjs/toolkit";

import userProfileReducer from './user';
import bookReducer from './book';
import bookRequestReducer from './book-request';
import studentReducer from './student';
import staffReducer from './staff';
import modalReducer from './modal';

export const store = configureStore({
    reducer: {
        userProfile: userProfileReducer,
        booksState: bookReducer,
        bookRequestState: bookRequestReducer,
        appModal: modalReducer,
        studentsState: studentReducer,
        staffsState: staffReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;