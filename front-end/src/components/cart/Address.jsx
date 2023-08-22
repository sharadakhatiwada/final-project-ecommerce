import { useState, useEffect, useContext } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import logo from "../../images/logoImage.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
export default function DelivaryAddress({ setAddressInfo }) {
  const { userContext } = useContext(UserContext);
  const apiPath = process.env.REACT_APP_SERVER_URL;
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    error: "",
  });

  const setUserInfo = function (value, property) {
    const userCopy = { ...address };
    userCopy[property] = value;
    setAddress(userCopy);
    setAddressInfo(userCopy);
  };
  //const navigate = useNavigate();

  return (
    <>
      <Container style={{ width: "100%", margin: "auto" }}>
        <div>Address</div>
        <Row>
          <Col md={3}>
            <label for="street">Street:</label>
          </Col>
          <Col md={9}>
            <input
              type="text"
              class="form-control"
              id="street"
              onChange={(e) => setUserInfo(e.target.value, "street")}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <label for="street">City:</label>
          </Col>
          <Col md={9}>
            <input
              type="text"
              class="form-control"
              id="street"
              onChange={(e) => setUserInfo(e.target.value, "city")}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <label for="state">State:</label>
            <input
              type="text"
              class="form-control"
              id="street"
              onChange={(e) => setUserInfo(e.target.value, "state")}
            />
          </Col>
          <Col md={9}>
            <label for="zip">Zip:</label>
            <input
              type="text"
              class="form-control"
              id="street"
              onChange={(e) => setUserInfo(e.target.value, "zip")}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
