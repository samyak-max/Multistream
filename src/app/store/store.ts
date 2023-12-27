import { configureStore } from '@reduxjs/toolkit';
import { Slice } from '../features/slice';

export const store = configureStore({
    reducer: {
        selector: Slice.reducer
    }
});