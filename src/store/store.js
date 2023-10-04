import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./slices/cars";

const store = configureStore({
    reducer: {
        cars: carsReducer,
    }
});

export default store;