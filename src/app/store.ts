import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movies/movieSlice";
import selectedMovieReducer from "./reducers/selectedMovie/selectedMovieSlice";
import searchParamsReducer from "./reducers/searchParams/searchParamsSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    selectedMovie: selectedMovieReducer,
    searchParams: searchParamsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
