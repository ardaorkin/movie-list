import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { MovieDetails, requestStatus } from "../types";
import { useEffect } from "react";
import {
  fetchSelectedMovie,
  setSelectedMovie,
  setSelectedMovieStatus,
} from "../app/reducers/selectedMovie/selectedMovieSlice";
import { Card, Divider, Rate, Spin, Typography } from "antd";

function Poster({ posterSrc }: { posterSrc: string }) {
  return <img alt="poster" src={posterSrc} />;
}

function Description({ year, director }: { year: string; director: string }) {
  return (
    <div className="description-wrapper">
      <Typography.Text type="secondary">{year}</Typography.Text>
      <div className="description-divider" />
      <Typography.Text type="secondary">{director}</Typography.Text>
    </div>
  );
}

function ShowAllMovies() {
  return (
    <a href="/movies" style={{ color: "#646cff" }}>
      Show all movies...
    </a>
  );
}

export function MovieDetails() {
  const selectedMovie = useAppSelector<MovieDetails>(
    (state) => state.selectedMovie.movie
  );
  const selectedMovieStatus = useAppSelector<requestStatus>(
    (state) => state.selectedMovie.status
  );
  const dispatch = useAppDispatch();
  const { id: imdbID } = useParams();

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchSelectedMovie(imdbID)).then((result) => {
        dispatch(setSelectedMovie(result.payload));
        dispatch(setSelectedMovieStatus(result.meta.requestStatus));
      });
    }
  }, [imdbID]);

  return selectedMovieStatus === "fulfilled" ? (
    <Card
      className="movie-card"
      actions={[<ShowAllMovies />]}
      cover={<Poster posterSrc={selectedMovie.Poster} />}
    >
      <Card.Meta
        title={selectedMovie.Title}
        description={
          <Description
            year={selectedMovie.Year}
            director={selectedMovie.Director}
          />
        }
      />
      <div className="rating">
        <Rate allowHalf value={parseFloat(selectedMovie.imdbRating) / 2} />
        <Typography.Text type="secondary">
          {selectedMovie.imdbRating}
        </Typography.Text>
      </div>
      <Typography.Text italic>{selectedMovie.Plot}</Typography.Text>
      <Divider />
      <div className="card-content">
        <Typography.Text>
          <Typography.Text strong>Cast:</Typography.Text> {selectedMovie.Actors}
        </Typography.Text>
      </div>
      <div className="card-content">
        <Typography.Text>
          <Typography.Text strong>Genre:</Typography.Text> {selectedMovie.Genre}
        </Typography.Text>
      </div>
      <div className="card-content">
        <Typography.Text>
          <Typography.Text strong>Writer:</Typography.Text>{" "}
          {selectedMovie.Writer}
        </Typography.Text>
      </div>
      <div className="card-content">
        <Typography.Text>
          <Typography.Text strong>Awards:</Typography.Text>{" "}
          {selectedMovie.Awards}
        </Typography.Text>
      </div>
    </Card>
  ) : (
    <Spin />
  );
}
