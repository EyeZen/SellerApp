import { createSlice } from "@reduxjs/toolkit";

const carsSlice = createSlice({
    name: "cars",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        dataLoadStart(state) {
            state.loading = true;
            state.error = null;
        },
        dataLoadSuccess(state, { payload }) {
            state.loading = false;
            state.data = payload;
        },
        dataLoadFailure(state, { payload }) {
            state.loading = false;
            state.error = payload;
        },

        markSaved(state, { payload }) {
            const { id, saved = true } = payload;
            if(state.data) {
                const idx = state.data.findIndex(item => item.id === id);
                if(idx >= 0) {
                    state.data[idx].saved = saved;
                }
            }
        },
    }
});

export const { dataLoadStart, dataLoadSuccess, dataLoadFailure, markSaved } = carsSlice.actions;
export const selectData = (state) => state.cars.data;
export const selectLoading = (state) => state.cars.loading;
export const selectError = (state) => state.cars.error;

export default carsSlice.reducer;