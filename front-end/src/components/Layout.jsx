import { Outlet } from "react-router-dom";
import NavPage from "./NavPage";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <NavPage />
      <div
        style={{
          overflowY: "scroll",
          height: "50rem",
        }}
      >
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default Layout;
