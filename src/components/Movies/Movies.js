import React, { useState, useEffect } from "react";
import axios from "axios";
import MyWatchList from "./MyWatchList";
import RandomMoviePicker from "./RandomMoviePicker";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Alert, Tabs, Tab, Button } from "react-bootstrap";
import { findIndex } from "lodash";
import MovieFormModal from "./MovieFormModal";
import AboutMovies from "./AboutMovies"
import Footer from "../Global/Footer";

export default function Movies() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [moviesList, setMyMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState(false);

  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const baseURL =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3002`
      : `https://nathanjms-api.herokuapp.com`;

  const getUserInfo = async (uid) => {
    setLoading(true);
    try {
      const result = await axios.post(baseURL + "/api/user-info", {
        firebaseId: uid,
      });
      setUserInfo(result.data);
    } catch (err) {
      setUserInfo({group_id: 0, group_name: "Unknown", user_name: "Unknown"});
      if (typeof err.response !== 'undefined') {
        setError(err.response.data);
      } else {
        setError('Error: The API could not be reached.');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserInfo(currentUser.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.group_id > 0) {
      getMovies(userInfo.group_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    if (userInfo && success.length > 0) {
      getMovies(userInfo.group_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const getMovies = async (userGroupId) => {
    setLoading(true);
    try {
      const result = await axios.get(
        baseURL + "/api/" + userGroupId + "/movies"
      );
      setMyMovies(result.data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const markAsSeen = async (movieId) => {
    try {
      await axios.post(baseURL + "/api/movies/seen", {
        movieId: movieId,
        userId: currentUser.uid,
      });
      let movieIndex = findIndex(moviesList, {
        id: movieId,
      });
      setSuccess("");
      setSuccess(`Movie "${moviesList[movieIndex]["title"]}" marked as seen!`);
    } catch (err) {
      setError(err.message);
    }
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out.");
    }
  }

  return (
    <>
      <div className="container" id="movies">
        <div className="row">
          <div className="col-lg-12 mt-4">
            <Button
              variant="link"
              className="topBtn"
              style={{ float: "right" }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
          <div className="col-lg-12">
            <h1 className="text-center">Movies</h1>
          </div>
          <div className="col-lg-12 pb-4">
            <h5 className="text-center pt-5">
              Name: {loading ? "Loading..." : `${userInfo.user_name}`}
            </h5>
            <h5 className="text-center">
              Group: {loading ? "Loading..." : `${userInfo.group_name}`}
            </h5>
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
              loading={loading}
              markAsSeen={markAsSeen}
              movies={moviesList}
              seen={false}
            />
          </Tab>
          <Tab eventKey="watched-movies-list" title="My Watched Movies">
            <MyWatchList
              loading={loading}
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
          baseURL={baseURL}
          userId={currentUser.uid}
          setError={setError}
          setSuccess={setSuccess}
        />
      </div>
      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
}
