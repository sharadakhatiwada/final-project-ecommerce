import React from "react";
import { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import logo from "../../images/logoImage.png";
import { Link } from "react-router-dom";

const apiPath = process.env.REACT_APP_SERVER_URL;

export default function Login(props) {
  const [user, setUser] = useState({ email: "", password: "", errors: "" });
  const setUserInfo = function (value, property) {
    if (property === "email") {
      setUser(...user, property);
    }
    if (property === "password") {
      setUser(...user, property);
    }
  };

  const submitUser = function () {
    if (Object.keys(user.errors).length > 0) {
      alert("Please Fill Form Properly!");
    } else {
      axios
        .post(
          `${apiPath}/api/auth/login`,
          {
            email: user.email,
            password: user.password,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
        .then((res) => {
          window.localStorage.setItem("token", res.data.accessToken);
          window.location.href = "/musicList";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  return (
    <>
      <div>
        <Container>
          <div>
            <img
              src={logo}
              alt="logo"
              style={{ height: "200px", marginTop: "10px" }}
            />
          </div>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <div className="border border-3 border-primary"></div>
              <Card className="shadow">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-uppercase ">Ecommerce</h2>
                    <p className=" mb-5">
                      Please enter your email and password!
                    </p>
                    <div className="mb-3">
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">
                            Email address
                          </Form.Label>
                          <Form.Control
                            class="container-fluid"
                            required
                            type="email"
                            value={user.email}
                            placeholder="Enter email"
                            onChange={(e) =>
                              setUserInfo(e.target.value, "email")
                            }
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            required
                            type="password"
                            value={user.password}
                            placeholder="Password"
                            onChange={(e) =>
                              setUserInfo(e.target.value, "password")
                            }
                          />
                        </Form.Group>

                        <div className="d-grid">
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={(e) => {
                              e.preventDefault();
                              submitUser();
                            }}
                          >
                            Login
                          </Button>
                        </div>
                        <div>not registered yet ?</div>
                        <button
                          type="submit"
                          class="btn btn-primary"
                          style={{ marginTop: "5px" }}
                        >
                          SignUp
                        </button>
                      </Form>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
