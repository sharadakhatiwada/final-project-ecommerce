import { useState } from "react";

export default function NewProductForm() {
 const [product, setProduct]= useState({
  name:"", price:"", quantity:"", description:""
 }) 
 const onChangeFunction = (prop, value)=>{
    if(prop==="name"){
      setProduct(...product, value);
    }
     if (prop === "price") {
       setProduct(...product, value);
     }
      if (prop === "quantity") {
        setProduct(...product, value);
      }
       if (prop === "description") {
         setProduct(...product, value);
       }
 }

  return (
    <>
      <div style={{ margin: "auto", width: "50%" }}>
        <div class="form-group">
          <label for="exampleFormControlInput1">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            onChange={(e)=>onChangeFunction("name", e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Price</label>
          <input type="text" class="form-control" id="price" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Quantity</label>
          <input type="text" class="form-control" id="quantity" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Category</label>
          <select class="form-control form-control-lg">
            <option>Home</option>
            <option>Women</option>
            <option>Men</option>
            <option>Kids</option>
            <option>Pets</option>
            <option>Furniture</option>
            <option>Self Care</option>
            <option>Plants</option>
          </select>
        </div>
        <form>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </form>
      </div>
      <button>Submit</button>
    </>
  );
}
