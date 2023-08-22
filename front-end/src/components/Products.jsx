import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
export default function Products() {
  const apiPath = process.env.REACT_APP_SERVER_URL;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);
  const getAllProduct = async () => {
    await axios
      .get(`${apiPath}/products`, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <>
      <div className="row">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
