import React, { useState, useEffect } from "react";
import MyWatchList from "../MyWatchList";
import RandomMoviePicker from "../RandomMoviePicker";
import AboutMovies from "../AboutMovies";
import { Alert, Tabs, Tab, Button } from "react-bootstrap";
import MovieFormModal from "./MovieFormModal";
import Footer from "../../Global/Footer";
import { findIndex } from "lodash";

export default function MoviesDemo() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [moviesList, setMyMovies] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAllMovies();
  }, []);

  useEffect(() => {}, [moviesList]);

  const getAllMovies = () => {
    setMyMovies(require("./DemoMovieList.json"));
  };

  const markAsSeen = (movieId) => {
    let tempMovieList = moviesList.slice(0);
    let movieIndex = findIndex(moviesList, {
      id: movieId,
    });
    tempMovieList[movieIndex]["seen"] = true;
    setSuccess(`Movie "${tempMovieList[movieIndex]["title"]}" marked as seen!`);
    setMyMovies(tempMovieList);
  };

  return (
    <>
      <div className="container" id="movies">
        <div className="row">
          <div className="col-lg-12 mt-4">
            <Button
              variant="link"
              className="topBtn"
              style={{ float: "right" }}
              disabled
            >
              Log Out
            </Button>
          </div>
          <div className="col-lg-12">
            <h5 className="text-center">
              <a href="https://nathanjms.co.uk">www.nathanjms.co.uk</a>
            </h5>
            <h1 className="text-center">Movies</h1>
            <h4 className="text-center">
              <i>Demo Version</i>
            </h4>
          </div>
          <div className="col-lg-12 pb-4">
            <h5 className="text-center pt-5">Name: Demo User</h5>
            <h5 className="text-center">Group: Demo Group</h5>
          </div>
          {error && (
            <Alert className="w-100" variant="danger">
              {error}
            </Alert>
          )}
          {success && (
            <Alert className="w-100" variant="success">
              {success}
            </Alert>
          )}
        </div>
        <Tabs defaultActiveKey="movies-list" id="tabs">
          <Tab eventKey="movies-list" title="My Watch List" style={{paddingBottom: '10px'}}>
            <Button
              variant="primary"
              className="mt-3"
              onClick={() => setShow(true)}
            >
              Add a new Film!
            </Button>

            <MyWatchList
              loading={false}
              markAsSeen={markAsSeen}
              movies={moviesList}
              seen={false}
            />
          </Tab>
          <Tab eventKey="watched-movies-list" title="My Watched Movies">
            <MyWatchList
              loading={false}
              markAsSeen={markAsSeen}
              movies={moviesList}
              seen={true}
            />
          </Tab>
          <Tab eventKey="random-movie-picker" title="Random Movie Picker">
            <RandomMoviePicker movies={moviesList} />
          </Tab>
          <Tab eventKey="about" title="About">
            <AboutMovies />
          </Tab>
          {/* <Tab eventKey="imdb" title="IMDB Top Movies"></Tab>
        <Tab eventKey="watched-imdb" title="IMDB Watched Movies"></Tab> */}
        </Tabs>
        <MovieFormModal
          handleClose={() => setShow(false)}
          show={show}
          setError={setError}
          setSuccess={setSuccess}
          moviesList={moviesList}
        />
      </div>
      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
}
