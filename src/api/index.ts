import { searchKeys } from "../constants";
import { searchOptions } from "../types";

export const getMovies = async (options: searchOptions) => {
  try {
    const url = new URL(import.meta.env.VITE_BASE_URL);
    url.searchParams.set("apikey", import.meta.env.VITE_OMDB_API_KEY);
    Object.entries(options).forEach(([param, value]) => {
      if (value) {
        url.searchParams.set(searchKeys[param as keyof searchOptions], value);
      } else {
        url.searchParams.delete(searchKeys[param as keyof searchOptions]);
      }
    });
    const response = await fetch(url.toString());
    const result = await response.json();
    return result.Search || [];
  } catch (error) {
    console.error(error);
  }
};

export const getMovieById = async (imdbID: string) => {
  try {
    const url = new URL(import.meta.env.VITE_BASE_URL);
    url.searchParams.set("apikey", import.meta.env.VITE_OMDB_API_KEY);
    url.searchParams.set("i", imdbID);
    const response = await fetch(url.toString());
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
