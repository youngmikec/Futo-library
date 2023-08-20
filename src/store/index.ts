import { configureStore } from "@reduxjs/toolkit";

import userProfileReducer from './user';
import bookReducer from './book';
import modalReducer from './modal';

export const store = configureStore({
    reducer: {
        userProfile: userProfileReducer,
        bookState: bookReducer,
        appModal: modalReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;