import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { addToCart } from "../utils";
import { Card, Col, Row, Carousel, Image } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { useSearchParams, useNavigate } from "react-router-dom";
export default function ProductDetails() {
  const navigate = useNavigate();
  const apiPath = process.env.REACT_APP_SERVER_URL;
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState({});
  const { userContext, setContext } = useContext(UserContext);
  useEffect(() => {
    axios
      .get(`${apiPath}/products/${searchParams.get("id")}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      {product && (
        <div style={{ display: "block", width: 700, padding: 30 }}>
          <h4>Product Details</h4>
          <Row>
            <Row md={6}>
              <Col md={6}>
                <div class="overflow-auto" style={{ height: "50rem" }}>
                  <ul class="list-group list-group-flush">
                    {product?.images?.map((image) => {
                      return (
                        <li className="list-group-item">
                          <Image
                            className="card-img-top d-block w-100"
                            src={image}
                            alt="Card image cap"
                            style={{ height: "15rem" }}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Col>
              <Col md={3}>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.details}</Card.Text>
                <Card.Text>Brand: {product.brand}</Card.Text>
                <Card.Title>${product.price}</Card.Title>
              </Col>
              <Col md={3}>
                <button
                  style={{
                    border: "none",
                    backgroundColor: "#efcc00",
                    width: "100%",
                    borderRadius: "5%",
                  }}
                  onClick={() =>
                    addToCart({ product, userContext, setContext })
                  }
                >
                  Add To Cart
                </button>
                <button
                  style={{
                    marginTop: "1rem",
                    border: "none",
                    backgroundColor: "#ffc40c",
                    width: "100%",
                    borderRadius: "5%",
                  }}
                  onClick={() =>
                    addToCart({
                      product,
                      userContext,
                      setContext,
                      callback: () => {
                        navigate("/products/carts");
                      },
                    })
                  }
                >
                  Buy Now
                </button>
              </Col>
            </Row>
          </Row>
        </div>
      )}
    </>
  );
}
