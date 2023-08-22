import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Product from "./product/Product";
import OrderTable from "./order/Order";
import { UserContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const { clearContext } = useContext(UserContext);
  const navigate = useNavigate();
  const singOut = () => {
    window.localStorage.removeItem("token");
    clearContext();
    navigate("/");
  };
  return (
    <Tabs>
      <TabList>
        <Tab>Product</Tab>
        <Tab>Order</Tab>
        <button class="nav-item" onClick={() => singOut()}>
          Sign out
        </button>
      </TabList>

      <TabPanel>
        <Product />
      </TabPanel>
      <TabPanel>
        <OrderTable />
      </TabPanel>
    </Tabs>
  );
}
