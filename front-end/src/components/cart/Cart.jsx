import { useEffect, useState, useContext } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Carousel,
  Image,
  Button,
} from "react-bootstrap";
import MyCheckoutForm from "./CheckOut";

import { UserContext } from "../../App";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import NumberInput from "./NumberInput";

export default function Cart() {
  const { userContext, setContext } = useContext(UserContext);
  const apiPath = process.env.REACT_APP_SERVER_URL;
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const stripePromise = loadStripe(
    "pk_test_51NamLiL35KzK7AfsAG8NRQIrotRTlbWrlzyLZbLvUufeyjbc5m5HfkOuu4ykfOtUY35Jx7tZtZGL1gsJOzah1ZmA00IEtoGSLa"
  );

  useEffect(() => {
    userContext.email && getProductsFromCart();
  }, [userContext]);

  const getProductsFromCart = () => {
    axios
      .get(`${apiPath}/products/carts/${userContext.id}`, {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
        },
      })
      .then((res) => {
        setCart(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      let subTotal = 0;
      const productPromises = cart.map(async (c) => {
        try {
          const response = await axios.get(
            `${apiPath}/products/${c.productId}`
          );
          const data = response.data;
          data.count = c.count;
          subTotal += data.count * ++data.price;
          return data;
        } catch (err) {
          console.log(err);
        }
      });
      const products = await Promise.all(productPromises);
      setProducts(products);
      setTotal(subTotal);
    };
    fetchAllProducts();
  }, [cart]);

  const removeFromCart = (productId) => {
    axios
      .delete(`${apiPath}/products/carts/${userContext.id}/${productId}`, {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
        },
      })
      .then(async (res) => {
        await getProductsFromCart();
        setContext(res.data);
      })
      .catch((e) => console.log(e));
  };

  const updateProductCount = (count, productId) => {
    axios
      .put(
        `${apiPath}/products/carts/${userContext.id}/${productId}`,
        {
          count: count,
        },
        {
          headers: {
            Authorization: `Bearer ${userContext.token}`,
          },
        }
      )
      .then(async () => getProductsFromCart())
      .catch((e) => console.log(e));
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={9}>
          {Object.keys(products).length > 0
            ? products.map((product) => {
                return (
                  <Row>
                    <Col md={4}>
                      <Card style={{ width: "18rem", margin: "auto" }}>
                        <Card.Body>
                          <Carousel>
                            {product.images.map((image) => {
                              return (
                                <Carousel.Item>
                                  <Image
                                    alt="Card image cap"
                                    style={{ height: "12rem" }}
                                    src={image}
                                  />
                                </Carousel.Item>
                              );
                            })}
                          </Carousel>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={8}>
                      <Card style={{ height: "14rem" }}>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Body>
                          <Card.Text>{product.details}</Card.Text>
                          <Card.Text>
                            <h6>${product.price}</h6>
                          </Card.Text>
                          <span
                            style={{
                              width: "25%",
                              display: "inline-block",
                            }}
                          >
                            Quantity:
                            <NumberInput
                              count={product.count}
                              updateCount={(newCount) => {
                                console.log("newCount", newCount);
                                updateProductCount(newCount, product._id);
                              }}
                            />
                          </span>
                          <Button
                            style={{ marginTop: "2px", border: "none" }}
                            onClick={() => removeFromCart(product._id)}
                          >
                            Remove
                          </Button>
                          {/* Add other card content here */}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                );
              })
            : "No Products in Cart Yet."}
        </Col>
        <Col md={3}>
          <Elements stripe={stripePromise}>
            <MyCheckoutForm total={total} cart={cart} />
          </Elements>
        </Col>
      </Row>
    </Container>
  );
}
