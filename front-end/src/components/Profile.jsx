import { UserContext } from "../App";
import { useContext } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

export default function () {
  const { setContext } = useContext(UserContext);

  return (
    <>
      <h1>Profile</h1>
      Choose Language:
      <DropdownButton
        onSelect={function (evt) {
          window.localStorage.setItem("lang", evt);
          setContext({ lang: evt });
        }}
      >
        <Dropdown.Item eventKey="en">English</Dropdown.Item>
        <Dropdown.Item eventKey="ne">Nepali</Dropdown.Item>
      </DropdownButton>
    </>
  );
}
