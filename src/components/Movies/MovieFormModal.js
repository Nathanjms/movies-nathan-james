import React, { useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { cloneDeep } from "lodash";

export default function MovieFormModal({
  handleClose,
  show,
  setError,
  setSuccess,
  request,
  moviesList,
  groupId,
  FormatResponseError,
  setMyUnseenMovies,
}) {
  const titleRef = useRef();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (titleRef.current.value.trim() === "") {
      setError("Invalid Title");
      return;
    }

    try {
      setError("");
      setLoading(true);
      var result = await request.post(`/api/movies/${groupId}/add`, {
        title: titleRef.current.value,
      });

      if (!result?.data?.id) {
        return setError("Could not obtain new movie ID.");
      }

      var tempMovieList = cloneDeep(moviesList);
      tempMovieList.data.push({
        id: result.data.id,
        title: titleRef.current.value.trim(),
        seen: false,
        rating: null,
      });
      setMyUnseenMovies(tempMovieList);
      handleClose();
      setLoading(false);
      setSuccess("");
      setSuccess(`Movie "${titleRef.current.value.trim()}" Added Successfully`);
    } catch (err) {
      handleClose();
      setLoading(false);
      setError(FormatResponseError(err));
    }
  }

  return (
    <>
      <Modal size="lg" show={show} onHide={() => handleClose()}>
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
