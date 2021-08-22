import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const baseURL =
    process.env.NODE_ENV === "development"
      ? `http://nathan-laravel-api.test`
      : `http://api.nathanjms.co.uk`;

  async function login(email, password) {
    setLoading(true);
    axios
      .post(`${baseURL}/api/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        setError("");
        if (response?.data?.success) {
          localStorage.setItem("token", response.data.token.value);
          localStorage.setItem(
            "expiry",
            JSON.stringify(response.data.token.expiration)
          );
          return history.push("/");
        } else {
          setError("Oops! Invalid Response from API");
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred, please try again.");
        }
        setLoading(false);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await login(emailRef.current.value, passwordRef.current.value);
  }
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
      id="login"
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <p>To access the Movies section, you must be signed in.</p>
          <p>
            Don't have an account? <Link to="/demo">Click here</Link> to demo
            the Movies section.
          </p>
          <p>
            <a href="https://nathanjms.co.uk">Go to main site.</a>
          </p>
        </div>
      </div>
    </Container>
  );
}
