import React, { useState, useEffect } from "react";
import MyWatchList from "../MyWatchList";
import RandomMoviePicker from "../RandomMoviePicker";
import { Alert, Tabs, Tab, Button } from "react-bootstrap";
import { findIndex } from "lodash";
import MovieFormModal from "../MovieFormModal";
import AboutMovies from "../AboutMovies";
import Footer from "../../Global/Footer";
import Swal from "sweetalert2";

export default function MoviesDemo() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [seenMoviesList, setMySeenMovies] = useState([]);
  const [unseenMoviesList, setMyUnseenMovies] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = () => {
    var allMovies = require("./DemoMovieList.json");
    var seenMovies = [];
    var unseenMovies = [];
    allMovies.forEach((currentVal, index) => {
      if (currentVal.seen) {
        seenMovies.push(currentVal);
      } else {
        unseenMovies.push(currentVal);
      }
    });
    setMySeenMovies(seenMovies);
    setMyUnseenMovies(unseenMovies);
  };

  const getNewMoviePage = () => {
    // Swal.fire("This feature is only available in the full version!");
    Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
      },
      buttonsStyling: false,
    }).fire({
      icon: "info",
      text: "This feature is only available in the full version!",
      // timer: 1500,
      timerProgressBar: true,
    });
  };

  const markAsSeen = async (movieId) => {
    let movieIndex = findIndex(unseenMoviesList, {
      id: movieId,
    });
    setNewMovieLists(unseenMoviesList, movieIndex)
    setSuccess(`Movie "${unseenMoviesList[movieIndex]["title"]}" marked as seen!`);
  };

  const setNewMovieLists = (moviesArray, movieIndex) => {
    let tempMovieList;
    tempMovieList = unseenMoviesList.slice(0);
    tempMovieList.splice(movieIndex, 1);
    setMyUnseenMovies(tempMovieList);
    tempMovieList = seenMoviesList.slice(0);
    tempMovieList.push(moviesArray[movieIndex]);
    setMySeenMovies(tempMovieList);
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
              <a href="https://www.nathanjms.co.uk">www.nathanjms.co.uk</a>
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
          <Tab eventKey="movies-list" title="My Watch List">
            <Button
              variant="primary"
              className="mt-3"
              onClick={() => setShow(true)}
            >
              Add a new Film!
            </Button>

            <MyWatchList
              markAsSeen={markAsSeen}
              movies={unseenMoviesList}
              seen={false}
              getNewMoviePage={getNewMoviePage}
              demo={true}
            />
          </Tab>
          <Tab eventKey="watched-movies-list" title="My Watched Movies">
            <MyWatchList
              markAsSeen={markAsSeen}
              movies={seenMoviesList}
              seen={true}
              getNewMoviePage={getNewMoviePage}
              demo={true}
            />
          </Tab>
          <Tab eventKey="random-movie-picker" title="Random Movie Picker">
            <RandomMoviePicker demo={true} demoMovies={unseenMoviesList} />
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
          moviesList={unseenMoviesList}
          setMyUnseenMovies={setMyUnseenMovies}
          demo={true}
        />
      </div>
      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
}
