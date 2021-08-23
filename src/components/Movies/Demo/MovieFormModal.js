import React, { useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function MovieFormModal({
  handleClose,
  show,
  setError,
  setSuccess,
  moviesList,
  FormatResponseError
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
      const lastIndex = moviesList.length - 1;
      moviesList.push({
        "id": moviesList[lastIndex]['id'] + 1,
        "title": titleRef.current.value.trim(),
        "seen": false,
        "rating": null
      });
      handleClose();
      setSuccess("");
      setSuccess(`Movie "${titleRef.current.value.trim()}" Added Successfully`);
    } catch (err) {
      setError(FormatResponseError(err));
    } finally {
      setLoading(false);
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
