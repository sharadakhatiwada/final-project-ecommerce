// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { categories } from "./admin/product/NewProductForm";
import { useTranslation } from "react-i18next";

// import { Button } from "bootstrap";
export default function NavPage() {
  const { userContext, clearContext, translate } = useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  //Sign out
  const singOut = () => {
    window.localStorage.removeItem("token");
    clearContext();
    navigate("/");
  };

  return (
    <>
      <nav
        class="navbar navbar-expand-lg navbar-dark"
        style={{
          width: "100%",
          backgroundColor: "#0071dc",
        }}
      >
        {/* <a class="navbar-brand" href="#">
          Navbar
        </a> */}
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">
                About
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">
                {t("welcome")}
              </a>
            </li>
          </ul>
          <form
            action={`/search?q=${search}`}
            method="GET"
            style={{
              marginLeft: "5%",
              width: "50%",
              float: "right",
              height: "40%",
            }}
          >
            <div class="input-group">
              <input
                class="form-control border-end-0 border rounded-pill"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />

              <span class="input-group-append">
                <button
                  type="button"
                  style={{
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "rgb(244, 196, 48)",
                    right: "2.25rem",
                    top: "0.30rem",
                    position: "relative",
                    zIndex: "999",
                  }}
                >
                  <a href={`/search?q=${search}`}>
                    <FontAwesomeIcon
                      style={{ color: "black" }}
                      icon={faMagnifyingGlass}
                    />
                  </a>
                </button>
              </span>
            </div>
          </form>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              {userContext.email && (
                <>
                  <li class="nav-item">
                    <Link to="/profile" class="nav-link">
                      {t("welcome")} {userContext.email}
                    </Link>
                  </li>
                  <li class="nav-item" onClick={() => singOut()}>
                    <a class="nav-link" href="#">
                      Sign out
                    </a>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/products/carts">
                      Cart
                      <FontAwesomeIcon icon={faCartShopping} />
                      {userContext.cartCount && (
                        <button
                          type="button"
                          style={{
                            borderRadius: "50%",
                            border: "none",
                            backgroundColor: "rgb(244, 196, 48)",
                          }}
                        >
                          {userContext.cartCount}
                        </button>
                      )}
                    </Link>
                  </li>
                </>
              )}
              {!userContext.email && (
                <>
                  <li class="nav-item" onClick={() => navigate("/login")}>
                    <a class="nav-link" href="#">
                      Sign In
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* nav for category */}
      <nav
        class="navbar navbar-expand-lg navbar-dark"
        style={{
          width: "100%",
          backgroundColor: "#0071dc",
          height: "40px",
          marginTop: "2px",
        }}
      >
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            {categories.map((c) => {
              return (
                <>
                  <li class="nav-item">
                    <a
                      key={c.name}
                      class="nav-link"
                      href={`/search?category=${c.value}`}
                    >
                      {c.name}
                    </a>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </nav>
      <div></div>
    </>
  );
}
{
  /* <Container>
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Container>; */
}

//  <FontAwesomeIcon
//    icon={faMagnifyingGlass}
//    style={{
//      backgroundColor: "#e5e500",
//      borderRadius: "50%",
//      marginLeft: "10px",
//    }}
//  />;
