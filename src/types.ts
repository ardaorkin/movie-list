export type searchOptions = {
  search: string;
  year?: string;
  type?: "movie" | "series" | "episodes";
};

export interface MovieSummary {
  imdbID: string;
  Year: string;
  Title: string;
  Poster: string;
  Type?: "series" | "movie" | "episodes";
}

export interface MovieDetails extends MovieSummary {
  Director: string;
  Genre: string;
  Writer: string;
  Actors: string;
  Awards: string;
  imdbRating: string;
  Plot: string;
}

export type requestStatus =
  | "idle"
  | "pending"
  | "succeeded"
  | "failed"
  | "fulfilled"
  | "rejected";
