import React, { useContext, useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FormatResponseError } from "../Global/apiCommunication";
import toast from "react-hot-toast";
import { UserContext } from "../User/UserContext";

export default function MovieFormModal({
  handleClose,
  show,
  request,
  moviesList,
  getAllMovies,
  demo = false,
}) {
  const titleRef = useRef();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const groupId = user.group_id;

  async function handleSubmit(e) {
    e.preventDefault();

    if (titleRef.current.value.trim() === "") {
      return toast.error("Invalid Title");
    }

    try {
      setLoading(true);
      if (!demo) {
        var result = await request.post(`/api/movies/${groupId}/add`, {
          title: titleRef.current.value,
        });

        if (!result?.data?.id) {
          return toast.error("Could not obtain new movie ID.");
        }
      }

      await getAllMovies(groupId)
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
