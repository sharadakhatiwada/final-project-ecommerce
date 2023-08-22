import React, { useMemo, useState, useEffect, useContext } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { UserContext } from "../../../App";
import axios from "axios";
import Modal from "react-modal";
import ProductUpdate from "./ProductUpdate";

const MyModal = ({ isOpen, onRequestClose, products }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="My Modal"
    >
      {/* Content of the modal */}
      <h2>Edit Product</h2>
      <button onClick={onRequestClose}>Close</button>
      <ProductUpdate products={products} />
    </Modal>
  );
};

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { userContext } = useContext(UserContext);
  const [editModal, setEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});
  const openEditModal = (product) => {
    setProductToEdit(product);
    setEditModal(true);
  };
  const closeModal = () => {
    setEditModal(false);
  };
  let token = userContext.token;
  const apiPath = process.env.REACT_APP_SERVER_URL;
  const getAllProducts = async () => {
    axios
      .get(`${apiPath}/products`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) => {
        alert(e);
      });
  };
  const deleteProduct = async (productId) => {
    axios
      .delete(`${apiPath}/products/${productId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert("product deleted");
        getAllProducts();
      })
      .catch((e) => alert(e));
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Price", accessor: "price" },
      { Header: "Quantity", accessor: "quantity" },
      { Header: "Description", accessor: "details" },
      { Header: "Category", accessor: "category" },
      { Header: "Brand", accessor: "brand" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: products,
      initialState: { pageIndex: 0 }, // Set the initial page index to 0
    },
    useFilters, // Enable filtering
    useSortBy, // Enable sorting
    usePagination // Enable pagination
  );

  return (
    <div>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="thead">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="tbody">
          {page.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td>
                  <button onClick={() => openEditModal(row.original)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteProduct(row.original._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <MyModal
        products={productToEdit}
        isOpen={editModal}
        onRequestClose={closeModal}
      />
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {page.length}
          </strong>
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
