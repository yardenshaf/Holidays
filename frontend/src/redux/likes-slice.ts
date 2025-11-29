import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface LikeState {
    likedVacations: string[];
}

const initialState: LikeState = {
    likedVacations: [],
};

export const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        userLikes: (state, action: PayloadAction<string[]>) => {
            state.likedVacations = action.payload;
        },
        like: (state, action: PayloadAction<string>) => {
            state.likedVacations.push(action.payload);
        },
        unlike: (state, action: PayloadAction<string>) => {
            state.likedVacations = state.likedVacations.filter((id) => id !== action.payload);
        },
    },
});

export const { userLikes, like, unlike } = likeSlice.actions;

export default likeSlice.reducer;
