import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

const NumberInput = ({ count, updateCount }) => {
  const [value, setValue] = useState(count);

  const handleIncrement = () => {
    setValue((prevValue) => {
      const newValue = prevValue + 1;
      updateCount(newValue);
      return newValue;
    });
  };

  const handleDecrement = () => {
    setValue((prevValue) => {
      const newValue = prevValue > 1 ? prevValue - 1 : 1;
      updateCount(newValue);
      return newValue;
    });
  };

  return (
    <InputGroup className="mb-3">
      <Button variant="outline-secondary" onClick={handleDecrement}>
        -
      </Button>
      <FormControl type="number" value={value} />
      <Button variant="outline-secondary" onClick={handleIncrement}>
        +
      </Button>
    </InputGroup>
  );
};

export default NumberInput;
