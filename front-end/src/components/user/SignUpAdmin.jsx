import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import logo from "../../images/logoImage.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function SignUp() {
  const { userContext } = useContext(UserContext);
  const apiPath = process.env.REACT_APP_SERVER_URL;
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    errors: {},
  });

  const setUserInfo = function (value, property) {
    const userCopy = { ...user };
    userCopy[property] = value;
    setUser(userCopy);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (userContext.email) {
      navigate("/");
    }
  });

  const submitUser = function () {
    console.log("API path ==>> ", apiPath);
    if (Object.keys(user.errors).length > 0) {
      alert("Please Fill Form Properly!");
    } else {
      axios
        .post(
          `${apiPath}/signup`,
          {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password,
            address: {
              street: user.street,
              city: user.city,
              state: user.state,
              zip: user.zip,
            },
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
          console.log("API PAth ", apiPath);
          alert(err);
          //alert(err.response.data.message);
        });
    }
  };
  return (
    <>
      <div style={{ width: "50%", margin: "auto" }}>
        {/* <form action="/action_page.php"> */}
        <div class="form-group">
          <label for="firstname">First Name:</label>
          <input
            type="text"
            class="form-control"
            id="firstname"
            onChange={(e) => setUserInfo(e.target.value, "firstname")}
          />
        </div>
        <div class="form-group">
          <label for="lastname">Last Name:</label>
          <input
            type="text"
            class="form-control"
            id="lastname"
            onChange={(e) => setUserInfo(e.target.value, "lastname")}
          />
        </div>
        <div class="form-group">
          <label for="email">Email address:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            onChange={(e) => setUserInfo(e.target.value, "email")}
          />
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input
            type="password"
            class="form-control"
            id="pwd"
            onChange={(e) => setUserInfo(e.target.value, "password")}
          />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number:</label>
          <input
            type="text"
            class="form-control"
            id="phoneNumber"
            onChange={(e) => setUserInfo(e.target.value, "phoneNumber")}
          />
        </div>
        <div>Address</div>
        <div class="form-group">
          <label for="street">Street:</label>
          <input
            type="text"
            class="form-control"
            id="street"
            onChange={(e) => setUserInfo(e.target.value, "street")}
          />
        </div>
        <div class="form-group">
          <label for="city">City:</label>
          <input
            type="text"
            class="form-control"
            id="city"
            onChange={(e) => setUserInfo(e.target.value, "city")}
          />
        </div>
        <div class="form-group">
          <label for="state">State:</label>
          <input
            type="text"
            class="form-control"
            id="state"
            onChange={(e) => setUserInfo(e.target.value, "state")}
          />
        </div>
        <div class="form-group">
          <label for="zipcode">Zip:</label>
          <input
            type="text"
            class="form-control"
            id="zip"
            onChange={(e) => setUserInfo(e.target.value, "zip")}
          />
        </div>
        <div class="form-group">
          <label for="lastname">Role:</label>
          <input
            type="text"
            class="form-control"
            id="role"
            onChange={(e) => setUserInfo("admin", "role")}
          />
        </div>
        <button
          onClick={() => {
            submitUser();
          }}
          class="btn btn-primary"
          style={{ marginTop: "5px" }}
        >
          Submit
        </button>
        {/* </form> */}
        <div>Already Registered ?</div>
        <Link to={"/login"}>Login</Link>
      </div>
    </>
  );
}
