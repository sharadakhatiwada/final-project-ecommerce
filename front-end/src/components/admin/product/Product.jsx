import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProductList from "./ProductList";
import "react-tabs/style/react-tabs.css";
import "../../../styles/admin/products.css";
import NewProductForm from "./NewProductForm";

export default function Product() {
  return (
    <>
      <Tabs>
        <TabList className={"left-align-tabs"}>
          <Tab>List Product</Tab>
          <Tab>Add Product</Tab>
        </TabList>
        <TabPanel>
          <ProductList />
        </TabPanel>
        <TabPanel>
          <NewProductForm />
        </TabPanel>
      </Tabs>
    </>
  );
}
