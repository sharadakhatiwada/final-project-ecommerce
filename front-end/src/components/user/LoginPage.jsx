import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function Login(props) {
  const { userContext } = useContext(UserContext);
  const apiPath = process.env.REACT_APP_SERVER_URL;
  const [user, setUser] = useState({ email: "", password: "", errors: "" });
  const setUserInfo = function (value, property) {
    const userCopy = { ...user };
    userCopy[property] = value;
    setUser(userCopy);
  };
  const navigate = useNavigate();
  useEffect(() => {
    console.log(userContext);
    if (userContext.email) {
      navigate("/");
    }
  });

  const submitUser = function () {
    if (userContext.email) {
      alert("Please Fill Form Properly!");
    } else {
      axios
        .post(
          `${apiPath}/login`,
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
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          alert("Invalid username or password");
          //alert(err.response.data.message);
        });
    }
  };

  return (
    <>
      <div>
        <Container>
          <div>
            {/* <img
              src={logo}
              alt="logo"
              style={{ height: "200px", marginTop: "10px" }}
            /> */}
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
                              submitUser();
                              e.preventDefault();
                            }}
                          >
                            Login
                          </Button>
                        </div>
                        <div>not registered yet ?</div>
                        <Link to={"/signup"}>Sign Up</Link>
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
