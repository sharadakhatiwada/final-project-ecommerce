import axios from "axios";
const apiPath = process.env.REACT_APP_SERVER_URL;

export function addToCart({ product, userContext, setContext, callback }) {
  axios
    .post(
      `${apiPath}/products/carts`,
      {
        productId: product._id,
        userId: userContext.id,
      },
      {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
        },
      }
    )
    .then((res) => {
      console.log("cart response ==>> ", res.data);
      setContext(res.data);
      alert("product added to cart successfully !!");
      if (callback) {
        callback();
      }
    })
    .catch((e) => console.log(e));
}
