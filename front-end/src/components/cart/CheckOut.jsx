import React, { useContext, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import DelivaryAddress from "./Address";
import { UserContext } from "../../App";

const MyCheckoutForm = ({ total = 0, cart }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const apiPath = process.env.REACT_APP_SERVER_URL;
  const { userContext } = useContext(UserContext);
  const [error, setError] = useState(null);

  //total amount calculation
  const salesTaxPercentage = 10;
  const amounts = {
    productsPrice: total.toFixed(2),
    salesTax: ((salesTaxPercentage / 100) * total).toFixed(2),
    totalAmount: ((10 / 100) * total + total).toFixed(2),
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Delivery Address Validation
    if (
      !addressInfo.street ||
      !addressInfo.city ||
      !addressInfo.state ||
      !addressInfo.zip
    ) {
      setAddressInfo((prev) => {
        return { ...prev, error: "Please enter delivery address" };
      });
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message);
      } else {
        await axios
          .post(
            `${apiPath}/products/carts/payment`,
            {
              paymentMethodId: paymentMethod.id,
              amount: amounts.totalAmount,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
              },
            }
          )
          .then(async (res) => {
            console.log(
              "Payment successful! Client secret:",
              res.data.clientSecret
            );
            // Use the client secret to confirm the payment on the client-side
            const result = await stripe.confirmCardPayment(
              res.data.clientSecret
            );

            if (result.paymentIntent.status === "succeeded") {
              console.log("Payment confirmed and succeeded.");
              setPaymentSuccess(true);

              // After Payment Success -- create Order
              const order = {
                userId: userContext.id,
                cart,
                amounts,
                deliveryAddress: addressInfo,
                status: "ordered",
              };
              axios
                .post(`${apiPath}/orders`, order, {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userContext.token}`,
                  },
                })
                .then(() => {
                  axios
                    .delete(`${apiPath}/products/carts/${userContext.id}`, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userContext.token}`,
                      },
                    })
                    .then((res) => {
                      window.location.reload();
                    });
                })
                .catch((err) => {
                  console.log("error when saving order ", err);
                });
            } else {
              setError("Payment failed. Please try again later.");
            }
          })
          .catch((err) => {
            console.log("payment error ", err);
          });
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
    setIsProcessing(false);
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <button
            style={{
              width: "100%",
              backgroundColor: "#efcc00",
              border: "none",
              color: "black",
            }}
          >
            Checkout
          </button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card
            style={{
              backgroundColor: "beige",
              height: "12rem",
              marginTop: "4px",
            }}
          >
            <Card.Title>Sub Total</Card.Title>
            <Card.Text>Products Price: ${amounts.productsPrice}</Card.Text>
            <Card.Text>Sales Tax: ${amounts.salesTax}</Card.Text>
            <Card.Text>Total: ${amounts.totalAmount}</Card.Text>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card style={{ backgroundColor: "beige", height: "15rem" }}>
            <Card.Title>Delivery Address</Card.Title>
            <Card.Body>
              <DelivaryAddress setAddressInfo={setAddressInfo} />
              <p style={{ color: "red" }}>{addressInfo.error}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card style={{ backgroundColor: "beige", height: "12rem" }}>
            <Card.Title>Card Details</Card.Title>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <div>
                  <CardElement />
                </div>
                {error && <div>{error}</div>}
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    marginTop: "3rem",
                    backgroundColor: "#efcc00",
                    border: "none",
                    color: "black",
                  }}
                  disabled={!stripe || isProcessing || paymentSuccess}
                >
                  {paymentSuccess
                    ? "Payment Success"
                    : isProcessing
                    ? "Processing..."
                    : "Pay Now"}
                </button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default MyCheckoutForm;
