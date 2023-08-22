import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

export default function UserTable() {
  const [users, setUsers] = useState([]);

  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    fetchUsers();
  }, []);
  function fetchUsers() {
    axios
      .get("http://localhost:8080/api/users", {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {});
  }

  function updateUser() {
    axios
      .post(
        `http://localhost:8080/api/users/${currentUser._id}`,
        { username: currentUser.username, email: currentUser.email },
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        fetchUsers();
        setCurrentUser({});
      });
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>S. Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    style={{
                      border: "#FAA0A0",
                      backgroundColor: "#FAA0A0",
                      color: "black",
                    }}
                    onClick={() => setCurrentUser(user)}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {Object.keys(currentUser).length > 0 && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={currentUser.username}
              onChange={(event) => {
                const copyCurrentUser = { ...currentUser };
                copyCurrentUser.username = event.target.value;
                setCurrentUser(copyCurrentUser);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={currentUser.email}
              onChange={(event) => {
                const copyCurrentUser = { ...currentUser };
                copyCurrentUser.email = event.target.value;
                setCurrentUser(copyCurrentUser);
              }}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Button
            style={{
              border: "#FAA0A0",
              backgroundColor: "#FAA0A0",
              color: "black",
            }}
            onClick={() => updateUser()}
          >
            Apply
          </Button>
          <Button
            style={{
              border: "#FAA0A0",
              backgroundColor: "#FAA0A0",
              color: "black",
            }}
            onClick={() => setCurrentUser({})}
          >
            Cancel
          </Button>
        </Form>
      )}
    </Container>
  );
}
