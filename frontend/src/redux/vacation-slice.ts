import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type Vacation from '../models/vacations/Vacation';

interface VacationState {
    newVacation?: Vacation;
    vacations: Vacation[];
}

const initialState: VacationState = {
    newVacation: undefined,
    vacations: [],
};

export const vacationSlice = createSlice({
    name: 'vacation',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Vacation[]>) => {
            state.vacations = action.payload;
        },
        newVacation: (state, action: PayloadAction<Vacation>) => {
            state.newVacation = action.payload;
        },
        updateVacation: (state, action: PayloadAction<Vacation>) => {
            const idx = state.vacations.findIndex((v) => v.id === action.payload.id);
            if (idx > -1) state.vacations[idx] = action.payload;
        },
        deleteVacation: (state, action: PayloadAction<string>) => {
            state.vacations = state.vacations.filter((v) => v.id !== action.payload);
        },
        updateLikesCount: (state, action: PayloadAction<{ vacationId: string; likesCount: number }>) => {
            const vacation = state.vacations.find((v) => v.id === action.payload.vacationId);
            if (vacation) vacation.likesCount = action.payload.likesCount;
        },
    },
});

export const { init, newVacation, updateVacation, deleteVacation, updateLikesCount } = vacationSlice.actions;

export default vacationSlice.reducer;
