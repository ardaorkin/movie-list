import {
  Action,
  PayloadAction,
  ThunkAction,
  createSlice,
} from "@reduxjs/toolkit";
import { searchOptions } from "../../../types";
import { RootState } from "../../store";

const initialState: searchOptions = localStorage.getItem("searchParams")
  ? JSON.parse(localStorage.getItem("searchParams") || "{}")
  : {
      search: "Life",
    };

const searchParams = createSlice({
  name: "searchParams",
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<searchOptions>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setSearchParams } = searchParams.actions;

export const saveSerchParams =
  (params: searchOptions): ThunkAction<void, RootState, unknown, Action> =>
  (dispatch) => {
    localStorage.setItem("searchParams", JSON.stringify(params));
    dispatch(setSearchParams(params));
  };

export default searchParams.reducer;
