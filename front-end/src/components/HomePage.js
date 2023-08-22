/* eslint-disable jsx-a11y/alt-text */
import Products from "./Products";
import { Card, Row, Col, Container } from "react-bootstrap";
const coverimage = require("../images/cover1.jpeg");

export default function Home() {
  return (
    <>
      <Container style={{ marginTop: "2rem" }}>
        <Row style={{ margin: "auto" }}>
          <Col md={3}>
            <Row>
              <div className="col-12">
                <Card
                  style={{
                    height: "15rem",
                    backgroundColor: "#F0C581",
                    border: "none",
                    borderRadius: "2%",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Title</Card.Title>
                    <Card.Text>Hello</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Row>
            <Row>
              <Col className="col-12">
                <Card
                  style={{
                    height: "25rem",
                    marginTop: "5px",
                    backgroundColor: "#FFDCA3",
                    border: "none",
                    borderRadius: "2%",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Title</Card.Title>
                    <Card.Text>Hello</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="col-12">
                <Card
                  style={{
                    height: "10.5rem",
                    marginTop: "5px",
                    backgroundColor: "#4682b4",
                    border: "none",
                    borderRadius: "2%",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Title</Card.Title>
                    <Card.Text>Hello</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col md={6} style={{ backgroundColor: "white" }}>
            <Row>
              <Col>
                <img
                  src={coverimage}
                  style={{
                    width: "100%",
                    marginTop: "1px",
                    borderRadius: "2%",
                    height: "27rem",
                    border: "none",
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Card
                  style={{
                    margin: "5px",
                    height: "13rem",
                    background: "#AFDBF5",
                    borderRadius: "2%",
                    border: "none",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Title</Card.Title>
                    <Card.Text>Hello</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  style={{
                    margin: "5px",
                    height: "13rem",
                    background: "#f0e68c",
                    borderRadius: "2%",
                    border: "none",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Title</Card.Title>
                    <Card.Text>Hello</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card
                  style={{
                    margin: "5px",
                    height: "10rem",
                    background: "#ffc40c",
                    borderRadius: "2%",
                    border: "none",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Title</Card.Title>
                    <Card.Text>Hello</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col md={3}>
            <Row>
              <Col>
                <Card
                  style={{
                    margin: "5px",
                    height: "12rem",
                    background: "#ffc40c",
                    borderRadius: "2%",
                    border: "none",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Title</Card.Title>
                    <Card.Text>Hello</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card
                  style={{
                    margin: "5px",
                    height: "14rem",
                    background: "#fbeeac",
                    borderRadius: "2%",
                    border: "none",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Title</Card.Title>
                    <Card.Text>Hello</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card
                  style={{
                    margin: "5px",
                    height: "23.4rem",
                    background: "#F0C581",
                    borderRadius: "2%",
                    border: "none",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Title</Card.Title>
                    <Card.Text>Hello</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div>
        <Products />
      </div>
    </>
  );
}
