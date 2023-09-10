import * as React from "react";
import { Filters } from "../components/Filters";
import { MoviesTable } from "../components/MoviesTable";
import { MovieSummary, searchOptions } from "../types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchMovies, searchMovies } from "../app/reducers/movies/movieSlice";
import { saveSerchParams } from "../app/reducers/searchParams/searchParamsSlice";

export function Movies() {
  const movies = useAppSelector<MovieSummary[]>((state) => state.movies);
  const searchParams = useAppSelector<searchOptions>(
    (state) => state.searchParams
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(searchMovies(searchParams)).then((result) => {
      dispatch(fetchMovies(result.payload));
    });
  }, [searchParams]);

  const handleApply = (params: searchOptions) =>
    dispatch(saveSerchParams(params));

  return (
    <div className="movies">
      <div className="filters">
        <Filters onApplyFilters={handleApply} defaultFilter={searchParams} />
      </div>
      <div className="movies-table">
        <MoviesTable
          data={movies}
          columns={[
            {
              title: "Name",
              key: "title",
              dataIndex: "Title",
              render: (item, record) => (
                <a href={`/movie/${record.imdbID}`}>{item}</a>
              ),
            },
            {
              title: "Year",
              key: "year",
              dataIndex: "Year",
            },
            {
              title: "Type",
              key: "type",
              dataIndex: "Type",
            },
            {
              title: "IMDB ID",
              key: "imdbID",
              dataIndex: "imdbID",
            },
          ]}
        />
      </div>
    </div>
  );
}
