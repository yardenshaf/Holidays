import { configureStore } from '@reduxjs/toolkit';
import likesSlice from './likes-slice';
import vacationSlice from './vacation-slice';

const store = configureStore({
    reducer: { likesSlice, vacationSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
