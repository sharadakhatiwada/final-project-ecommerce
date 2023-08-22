import React, { useMemo, useState, useEffect, useContext } from "react";
import { ListGroup, Form } from "react-bootstrap";
import { UserContext } from "../../../App";
import axios from "axios";

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const { userContext } = useContext(UserContext);
  let token = userContext.token;
  const apiPath = process.env.REACT_APP_SERVER_URL;
  const getAllOrders = async () => {
    axios
      .get(`${apiPath}/orders`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("===== ", res.data);
        setOrders(res.data);
      })
      .catch((e) => {
        alert(e);
      });
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  const changeStatus = (status, orderId) => {
    axios
      .put(
        `${apiPath}/orders/${orderId}`,
        { status: status },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setOrders((prev) => {
          const copy = prev.map((order) => {
            if (order._id === orderId) {
              order.status = status;
            }
            return order;
          });
          return copy;
        });
      });
  };

  return (
    <>
      {orders.map((order) => {
        console.log(order);
        return (
          <ListGroup horizontal>
            <ListGroup>
              <ListGroup.Item>Order Id: {order._id}</ListGroup.Item>
              <ListGroup.Item>User Id: {order.userId}</ListGroup.Item>
            </ListGroup>
            <ListGroup>
              <ListGroup.Item>
                Street:{order.deliveryAddress.street}
              </ListGroup.Item>
              <ListGroup.Item>City:{order.deliveryAddress.city}</ListGroup.Item>
              <ListGroup.Item>
                State:{order.deliveryAddress.state}
              </ListGroup.Item>
              <ListGroup.Item>Zip:{order.deliveryAddress.zip}</ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              <ListGroup>
                <ListGroup.Item>
                  Products Price: {order.amounts.productsPrice}
                </ListGroup.Item>
                <ListGroup.Item>
                  Sales Tax: {order.amounts.salesTax}
                </ListGroup.Item>
                <ListGroup.Item>
                  Total Amount: {order.amounts.totalAmount}
                </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>
            <ListGroup.Item>
              <ListGroup>
                {order.cart.map((item) => {
                  return (
                    <ListGroup horizontal>
                      <ListGroup.Item>
                        ProductId: {item.productId}
                      </ListGroup.Item>
                      <ListGroup.Item>Quantity: {item.count}</ListGroup.Item>
                    </ListGroup>
                  );
                })}
              </ListGroup>
            </ListGroup.Item>
            <ListGroup.Item>
              Status: {order.status}
              <div key={`inline-radio`} className="mb-3">
                <Form.Check
                  disabled={order.status === "delivered"}
                  label="Shipped"
                  name={order._id + "_group"}
                  type="radio"
                  id={`inline-radio-1`}
                  onChange={() => changeStatus("shipped", order._id)}
                />
                <Form.Check
                  disabled={order.status === "delivered"}
                  label="Delivered"
                  name={order._id + "_group"}
                  type="radio"
                  id={`inline-radio-2`}
                  onChange={() => changeStatus("delivered", order._id)}
                />
              </div>
            </ListGroup.Item>
          </ListGroup>
        );
      })}
    </>
  );
}
