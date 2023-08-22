import logo from "./logo.svg";
import "./App.css";
import Login from "./components/user/LoginPage";
import NavPage from "./components/NavPage";
import SignUp from "./components/user/SignUp";
import Home from "./components/HomePage";
import ProductTable from "./components/Admin/product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewProductForm from "./components/Product/NewProductForm";

function App() {
  return (
    <div className="App">
      <NewProductForm />
    </div>
  );
}

export default App;
//<Login />
// <HomePage />
// <NavPage/>
//<SignUp />
//<ProductTable />;
{
  /* <BrowserRouter>
  <Routes>
    <Route path="home" element={<HomePage />} />
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<SignUp />} />
    <Route path="*"></Route>
  </Routes>
</BrowserRouter>; */
}
