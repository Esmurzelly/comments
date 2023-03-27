import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './commentSlice';
import imageReducer from './imageSlice';

export const store = configureStore({
    reducer: {
        comments: commentReducer,
        images: imageReducer,
    }
})