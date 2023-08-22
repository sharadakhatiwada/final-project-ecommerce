import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import Modal from "react-modal";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export const categories = [
  { name: "Home", value: "home" },
  { name: "Pets", value: "pets" },
  { name: "Women", value: "women" },
  { name: "Men", value: "men" },
  { name: "Kids", value: "kids" },
  { name: "Electronics", value: "electronics" },
  { name: "Furniture", value: "furniture" },
  { name: "Plants", value: "plants" },
  { name: "Self Care", value: "selfCare" },
];

export default function ProductUpdate({ products }) {
  const { userContext } = useContext(UserContext);
  let navigate = useNavigate();
  let token = userContext.token;

  const apiPath = process.env.REACT_APP_SERVER_URL;
  const [product, setProduct] = useState(products);
  const setProductInfo = function (value, property) {
    console.log(property, value);
    const productCopy = { ...product };
    productCopy[property] = value;
    setProduct(productCopy);
  };
  console.log("proddd----", products);
  const submitEditProduct = function () {
    axios
      .put(
        `${apiPath}/products/${product._id}`,
        {
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          details: product.details,
          category: product.category,
          brand: product.brand,
          images: product.images,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert("Product Updated Successfully !!");
        navigate("/");
      })
      .catch((err) => {
        console.log("API PAth ", apiPath);
        alert(err);
        //alert(err.response.data.message);
      });
  };
  return (
    <>
      <div style={{ width: "50%", margin: "auto" }}>
        {/* <form action="/action_page.php"> */}
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            class="form-control"
            id="name"
            value={product.name}
            onChange={(e) => setProductInfo(e.target.value, "name")}
          />
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input
            type="text"
            value={product.price}
            class="form-control"
            id="price"
            onChange={(e) => setProductInfo(e.target.value, "price")}
          />
        </div>
        <div class="form-group">
          <label for="quantity">Quantity:</label>
          <input
            type="text"
            value={product.quantity}
            class="form-control"
            id="quantity"
            onChange={(e) => setProductInfo(e.target.value, "quantity")}
          />
        </div>
        <div class="form-group">
          <label for="details">Descriptions:</label>
          <textarea
            type="text"
            value={product.details}
            class="form-control"
            id="details"
            onChange={(e) => setProductInfo(e.target.value, "details")}
          />
        </div>

        <div class="form-group">
          <label for="brand">Brand:</label>
          <input
            type="text"
            value={product.brand}
            class="form-control"
            id="brand"
            onChange={(e) => setProductInfo(e.target.value, "brand")}
          />
        </div>
        <div class="form-group">
          <label for="images">Images(comma separated):</label>
          <input
            type="text"
            value={product.images}
            class="form-control"
            id="images"
            onChange={(e) => setProductInfo(e.target.value, "images")}
          />
        </div>

        <div class="form-group">
          <label for="category">Category:</label>
          <select
            class="form-control"
            value={product.category}
            onChange={(e) => setProductInfo(e.target.value, "category")}
          >
            {categories.map((c) => {
              return (
                <option key={c.name} value={c.value}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button
        onClick={() => {
          submitEditProduct();
        }}
        class="btn btn-primary"
        style={{ marginTop: "5px" }}
      >
        Submit
      </button>
    </>
  );
}
