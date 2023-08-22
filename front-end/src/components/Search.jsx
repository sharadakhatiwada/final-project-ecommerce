import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
export default function SearchProduct() {
  const apiPath = process.env.REACT_APP_SERVER_URL;
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    searchProduct();
  }, []);

  const searchProduct = async () => {
    await axios
      .get(
        `${apiPath}/products?searchText=${searchParams.get(
          "q"
        )}&category=${searchParams.get("category")}`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
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
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </>
  );
}
