import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMovies } from "../../../api";
import { MovieSummary, searchOptions } from "../../../types";

const initialState: MovieSummary[] = [];

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchMovies: (state, action: PayloadAction<MovieSummary[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { fetchMovies } = movieSlice.actions;

export const searchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchParams: searchOptions) => {
    const result = await getMovies(searchParams);
    return result;
  }
);

export default movieSlice.reducer;
