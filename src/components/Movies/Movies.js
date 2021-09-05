/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import MyWatchList from "./MyWatchList";
import RandomMoviePicker from "./RandomMoviePicker";
import { useHistory } from "react-router-dom";
import { Alert, Tabs, Tab, Button } from "react-bootstrap";
import { findIndex, cloneDeep } from "lodash";
import MovieFormModal from "./MovieFormModal";
import AboutMovies from "./AboutMovies";
import Footer from "../Global/Footer";
import {
  AuthenticatedRequest,
  FormatResponseError,
} from "../Global/apiCommunication";
import ReactLoading from "react-loading";
import { UserContext } from "../User/UserContext";
import toast, { Toaster } from "react-hot-toast";

export default function Movies({ token }) {
  const [error, setError] = useState("");
  const [seenMoviesList, setMySeenMovies] = useState([]);
  const [unseenMoviesList, setMyUnseenMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const { user, setUser } = useContext(UserContext);

  const AuthRequest = AuthenticatedRequest(token);

  const getUserInfo = async () => {
    setLoading(true);
    console.log("Get User Data");
    try {
      const result = await AuthRequest.post("/api/movies/user-info");
      setUser(result.data);
    } catch (err) {
      setError(FormatResponseError(err));
    } finally {
      setLoading(false);
    }
  };

  const perPage = () => {
    if (window.screen.availWidth >= 1020) return 8;
    if (480 < window.screen.availWidth && window.screen.availWidth < 1020)
      return 6;
    return 4;
  };

  useEffect(async () => {
    console.log("Movies Component rendered");
    console.log(`movies token: ${token}`);
    await getUserInfo();
  }, []);

  useEffect(() => {
    if (user?.group_id > 0) {
      getAllMovies(user.group_id);
    }
  }, [user]);

  const getAllMovies = async (userGroupId) => {
    console.log(`getAllMovies, group ID: ${userGroupId}`);
    setLoading(true);
    try {
      const resultSeen = await AuthRequest.get(
        `/api/movies/${userGroupId}/group?isSeen=1&perPage=${perPage()}`
      );
      const resultUnseen = await AuthRequest.get(
        `/api/movies/${userGroupId}/group?isSeen=0&perPage=${perPage()}`
      );
      setMySeenMovies(resultSeen.data);
      setMyUnseenMovies(resultUnseen.data);
    } catch (err) {
      setError(FormatResponseError(err));
    }
    setLoading(false);
  };

  const getNewMoviePage = async (url, isSeen) => {
    if (process.env.NODE_ENV === "production") {
      url = url.replace("http:", "https:");
    }
    try {
      const newMovies = await AuthRequest.get(url);
      if (isSeen) {
        return setMySeenMovies(newMovies.data);
      }
      return setMyUnseenMovies(newMovies.data);
    } catch (err) {
      setError(FormatResponseError(err));
    }
  };

  const markAsSeen = async (movieId) => {
    try {
      await AuthRequest.put("/api/movies/mark-as-seen", {
        movieId: movieId,
      });
      var moviesArray = unseenMoviesList.data;
      let movieIndex = findIndex(moviesArray, {
        id: movieId,
      });
      toast.success(
        `Movie "${moviesArray[movieIndex]["title"]}" marked as seen!`
      );
      setNewMovieLists(moviesArray, movieIndex);
    } catch (err) {
      toast.error(FormatResponseError(err));
    }
  };

  const setNewMovieLists = (moviesArray, movieIndex) => {
    let tempMovieList;
    tempMovieList = cloneDeep(unseenMoviesList);
    tempMovieList.data.splice(movieIndex, 1);
    setMyUnseenMovies(tempMovieList);
    tempMovieList = cloneDeep(seenMoviesList);
    tempMovieList.data.push(moviesArray[movieIndex]);
    setMySeenMovies(tempMovieList);
  };

  async function handleLogout() {
    setError("");
    localStorage.clear();
    try {
      await AuthRequest.post("/api/logout");
    } catch (err) {
    } finally {
      history.push("/login");
    }
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: "#363636",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#363636",
              color: "#fff",
            },
          },
        }}
      />
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
            <h5 className="text-center">
              <a href="https://www.nathanjms.co.uk">www.nathanjms.co.uk</a>
            </h5>
            <h1 className="text-center">Movies</h1>
          </div>
          <div className="col-lg-12 pb-4">
            <h5 className="text-center pt-5">
              Name:{" "}
              {loading
                ? "Loading..."
                : user?.user_name
                ? `${user.user_name}`
                : `Unknown`}
            </h5>
            <h5 className="text-center">
              Group:{" "}
              {loading
                ? "Loading..."
                : user?.group_name
                ? `${user.group_name}`
                : `Unknown`}
            </h5>
          </div>
          {error && (
            <Alert className="w-100" variant="danger">
              {error}
            </Alert>
          )}
        </div>
        <Tabs defaultActiveKey="movies-list" id="tabs">
          <Tab eventKey="movies-list" title="My Watch List">
            {loading ? (
              <div className="col-lg-12 d-flex row justify-content-center">
                <div className="col-lg-12">
                  <h3>Loading Movies...</h3>
                </div>
                <div>
                  <ReactLoading height={30} width={30} type={"spin"} />
                </div>
              </div>
            ) : (
              <>
                {!error && (
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={() => setShow(true)}
                  >
                    Add a new Film!
                  </Button>
                )}
                <MyWatchList
                  markAsSeen={markAsSeen}
                  movies={unseenMoviesList}
                  seen={false}
                  getNewMoviePage={getNewMoviePage}
                />
              </>
            )}
          </Tab>
          <Tab eventKey="watched-movies-list" title="My Watched Movies">
            {loading ? (
              <div className="col-lg-12 d-flex row justify-content-center">
                <div className="col-lg-12">
                  <h3>Loading Movies...</h3>
                </div>
                <div>
                  <ReactLoading height={30} width={30} type={"spin"} />
                </div>
              </div>
            ) : (
              <>
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={() => setShow(true)}
                >
                  Add a new Film!
                </Button>
                <MyWatchList
                  markAsSeen={markAsSeen}
                  movies={seenMoviesList}
                  seen={true}
                  getNewMoviePage={getNewMoviePage}
                  request={AuthRequest}
                />
              </>
            )}
          </Tab>
          <Tab eventKey="random-movie-picker" title="Random Movie Picker">
            {!user?.group_id ? (
              <div className="col-lg-12 d-flex row justify-content-center">
                <div className="col-lg-12">
                  <h3>Loading Random Movie Picker...</h3>
                </div>
                <div>
                  <ReactLoading height={30} width={30} type={"spin"} />
                </div>
              </div>
            ) : (
              <RandomMoviePicker
                request={AuthRequest}
                groupId={user.group_id}
              />
            )}
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
          request={AuthRequest}
          moviesList={unseenMoviesList}
          groupId={user.group_id}
          FormatResponseError={FormatResponseError}
          setMyUnseenMovies={setMyUnseenMovies}
        />
      </div>
      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
}
