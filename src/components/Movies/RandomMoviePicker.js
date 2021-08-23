import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import {
  AuthenticatedRequest,
} from "../Global/apiCommunication";

export default function RandomMoviePicker({ currentUser, groupId }) {
  const [chosen, setChosen] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const [randomMovie, setRandomMovie] = useState("");
  let movies = [];
  const getAllMovies = async () => {
    movies = await AuthenticatedRequest(currentUser).get(
      `/api/movies/${groupId}/group?isSeen=0&perPage=200`
    ); //TODO: Get this array when doing the random movie selection.;
    console.log(movies);
  }

  useEffect(async () => {
    await getAllMovies();
  }, []);

  function random(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  const wait = (delay, ...args) =>
    new Promise((resolve) => setTimeout(resolve, delay, ...args));

  const chooseMovie = async (movies) => {
    setChoosing(true);
    setChosen(false);
    var i = 20;
    if (movies.length === 1) { // If only one, chose it instantly! 
      // TODO: Add message when this is the case.
      i = 1;
    }
    while (i > 0) {
      var movie = random(movies);
      setRandomMovie(movie.title);
      await wait(20 * i);
      i--;
    }
    setChosen(movie.title);
    setChoosing(false);
  };

  const movieCardContent = (movies, randomMovie, chosen) => {
    if (movies.length === 0) {
      return (
        <div className="col-lg-12">
          <h3>There are no movies to choose from!</h3>
        </div>
      );
    }
    return (
      <div className="pb-10">
        <div className="col-lg-12 pb-2">
          <h4>What Will I Choose?</h4>
        </div>
        <Button disabled={choosing} onClick={() => chooseMovie(movies)}>
          Find a Movie!
        </Button>
        {randomMovie.length > 0 && !chosen && (
          <div className="col-lg-12 mt-5">
            <h3 className="pb-5">Choosing...</h3>
            <h4>{randomMovie}</h4>
          </div>
        )}
        {chosen && (
          <div className="col-lg-12 mt-5">
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
        <div className="text-center mt-2 row justify-content-center" id="randomMovieDiv">
          <Card.Body className="random-movie-card">
            {movieCardContent(movies, randomMovie, chosen)}
          </Card.Body>
        </div>
      </div>
    </div>
  );
}
