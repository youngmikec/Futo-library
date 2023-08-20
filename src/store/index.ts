import { configureStore } from "@reduxjs/toolkit";

import userProfileReducer from './user';
import bookReducer from './book';
import bookRequestReducer from './book-request';
import modalReducer from './modal';

export const store = configureStore({
    reducer: {
        userProfile: userProfileReducer,
        booksState: bookReducer,
        bookRequestState: bookRequestReducer,
        appModal: modalReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;