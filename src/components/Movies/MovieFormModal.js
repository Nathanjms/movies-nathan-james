import React, { useContext, useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FormatResponseError } from "../Global/apiCommunication";
import toast from "react-hot-toast";
import { UserContext } from "../User/UserContext";
import { perPage } from "../Global/Helpers";
import { cloneDeep } from "lodash";

export default function MovieFormModal({
  handleClose,
  show,
  request,
  moviesList,
  getAllMovies,
  setMyUnseenMovies,
  demo = false,
}) {
  const titleRef = useRef();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const groupId = user.group_id;
  const nextId = useRef(19);

  async function handleSubmit(e) {
    e.preventDefault();

    if (titleRef.current.value.trim() === "") {
      return toast.error("Invalid Title");
    }

    try {
      setLoading(true);
      if (!demo) {
        var result = await request.post(`/api/movies/${groupId}/add`, {
          title: titleRef.current.value.trim(),
        });

        if (!result?.data?.id) {
          handleClose();
          setLoading(false);
          return toast.error("Could not obtain new movie ID.");
        }

        if (moviesList.data.length < perPage()) {
          var tempMoviesList = cloneDeep(moviesList);
          tempMoviesList.data.push({
            id: result.data.id,
            title: titleRef.current.value.trim(),
            seen: false,
            rating: null,
          });
          setMyUnseenMovies(tempMoviesList);
        } else if (
          moviesList.data.length === perPage() &&
          !moviesList?.next_page_url
        ) {
          // If new page has been created, reload all movies to generate next page buttons.
          await getAllMovies(groupId);
        }
      } else {
        // If demo, add on to end regardless of number already there.
        moviesList.push({
          id: nextId.current + 1,
          title: titleRef.current.value.trim(),
          rating: null,
          seen: false,
        });
        nextId.current++;
      }

      handleClose();
      setLoading(false);
      toast.success(
        `Movie "${titleRef.current.value.trim()}" Added Successfully`
      );
    } catch (err) {
      setLoading(false);
      toast.error(FormatResponseError(err));
    }
  }

  return (
    <>
      <Modal centered={true} show={show} onHide={() => handleClose()}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add new movie to watch list</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group id="title">
              <Form.Label>What's the Movie Title?</Form.Label>
              <Form.Control type="text" ref={titleRef} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
            <Button disabled={loading} variant="primary" type="submit">
              Submit!
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
