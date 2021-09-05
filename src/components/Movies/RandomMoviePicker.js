/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { FormatResponseError } from "../Global/apiCommunication";
export default function RandomMoviePicker({
  request,
  groupId,
  demo = false,
  demoMovies = [],
}) {
  const [chosen, setChosen] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const [randomMovie, setRandomMovie] = useState("");
  const [noMovies, setNoMovies] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const getAllMovies = async () => {
    if (demo) {
      return demoMovies;
    }
    try {
      const response = await request.get(
        `/api/movies/${groupId}/group?isSeen=0&perPage=200`
      );
      return response.data.data;
    } catch (error) {
      setError(FormatResponseError(error));
      return [];
    }
  };

  function random(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  const wait = (delay, ...args) =>
    new Promise((resolve) => setTimeout(resolve, delay, ...args));

  const chooseMovie = async () => {
    setNoMovies(false);
    setChoosing(true);
    setChosen(false);
    setRandomMovie("");
    setMessage("");
    var movies = await getAllMovies();
    var movie;
    if (!movies) {
      setError("Error");
    } else if (movies.length === 0) {
      setNoMovies(true);
    } else if (movies.length > 0) {
      var i = 0;
      if (movies.length === 1) {
        // If only one, chose it instantly!
        setMessage("Its not random when there's only one movie!");
        movie = movies[0];
        setRandomMovie(movie.title);
      } else {
        var modifier = 1;
        while (i < 50) {
          movie = random(movies);
          setRandomMovie(movie.title);
          modifier = i > 40 ? modifier + 1 : modifier;
          await wait(30 * modifier);
          i++;
        }
      }
      setChosen(movie.title);
    }
    setChoosing(false);
  };

  const movieCardContent = (noMovies, randomMovie, chosen) => {
    if (noMovies) {
      return (
        <div className="col-lg-12">
          <h3>There are no movies to choose from!</h3>
          <small>Added movies? Click below to try again!</small>
          <div className="text-center">
            <Button disabled={choosing} onClick={() => chooseMovie()}>
              Find a Movie!
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="pb-10">
        <div className="col-lg-12 pb-2">
          <h4>What Will I Choose?</h4>
        </div>
        <Button disabled={choosing} onClick={() => chooseMovie()}>
          Find a Movie!
        </Button>
        {choosing && (
          <div className="col-lg-12 mt-5">
            <h3 className="pb-5">Choosing...</h3>
            <h4>{randomMovie}</h4>
          </div>
        )}
        {chosen && (
          <div className="col-lg-12 mt-5">
            {message && (
              <Alert className="w-100" variant="info">
                {message}
              </Alert>
            )}
            <h3 className="pb-5">I have selected:</h3>
            <h4>{randomMovie}</h4>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="row">
      <div className="col-lg-12 pt-3">
        <h3 className="text-center pb-5">Random Movie Picker</h3>
      </div>
      <div className="col-lg-12 d-flex justify-content-center">
        <div
          className="text-center mt-2 row justify-content-center"
          id="randomMovieDiv"
        >
          {error && (
            <Alert className="w-100" variant="danger">
              {error}
            </Alert>
          )}

          <Card.Body className="random-movie-card">
            {error || noMovies
              ? movieCardContent(true, randomMovie, chosen)
              : movieCardContent(false, randomMovie, chosen)}
          </Card.Body>
        </div>
      </div>
    </div>
  );
}
