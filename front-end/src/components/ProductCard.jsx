import { Card, Carousel, Image } from "react-bootstrap";
import ProductDetails from "./ProductDetails";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import { addToCart } from "../utils";
import axios from "axios";
export default function ProductCard({ product }) {
  const apiPath = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const { userContext, setContext } = useContext(UserContext);

  console.log(userContext);

  return (
    <>
      <Card style={{ width: "18rem", margin: "auto", border: "none" }}>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Carousel>
            {product.images.map((image) => {
              console.log(image);
              return (
                <Carousel.Item>
                  <Image
                    class="card-img-top d-block w-100"
                    src={image}
                    alt="Card image cap"
                    style={{ height: "15rem" }}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <h6>${product.price}</h6>
          <button
            style={{
              width: "80%",
              border: "none",
              margin: "2px",
              backgroundColor: "#ffc40c",
            }}
            onClick={() => {
              navigate(`/products/details?id=${product._id}`);
            }}
          >
            Details
          </button>
          <button
            style={{ border: "none", backgroundColor: "#efcc00" }}
            onClick={() => addToCart({ product, userContext, setContext })}
          >
            Add To Cart
          </button>
          <button
            style={{
              marginLeft: "2px",
              border: "none",
              backgroundColor: "#efcc00",
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
            Shop Now
          </button>
          {/* Add other card content here */}
        </Card.Body>
      </Card>
    </>
  );
}
//   <h6>{product.category}</h6>;
//   {
//     product.brand && <h6>{product.brand}</h6>;
//   }
//   <Card.Text>{product.details}</Card.Text>;
