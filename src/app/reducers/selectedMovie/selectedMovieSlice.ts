import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieDetails, requestStatus } from "../../../types";
import { getMovieById } from "../../../api";

interface SelectedMovie {
  movie: MovieDetails;
  status: requestStatus;
}
const initialState: SelectedMovie = {
  movie: {
    imdbID: "",
    Year: "",
    Title: "",
    Poster: "",
    Director: "",
    Genre: "",
    Writer: "",
    Actors: "",
    Awards: "",
    imdbRating: "",
    Plot: "",
  },
  status: "idle",
};

export const selectedMovie = createSlice({
  name: "selectedMovie",
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<MovieDetails>) => {
      state.movie = action.payload;
      return state;
    },
    setSelectedMovieStatus: (state, action: PayloadAction<requestStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setSelectedMovie, setSelectedMovieStatus } =
  selectedMovie.actions;

export const fetchSelectedMovie = createAsyncThunk(
  "selectedMovie/fetchSelectedMovie",
  async (imdbID: string) => {
    const selectedMovie = await getMovieById(imdbID);
    return selectedMovie;
  }
);

export default selectedMovie.reducer;
