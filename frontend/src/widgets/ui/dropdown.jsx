import React from "react";
import { Select, Option } from "@material-tailwind/react";

const Dropdown = ({ options, label, value, onChange, defaultOption }) => {
  return (
    <div>
      <Select
        data-testid="dropdown"
        variant="outlined"
        label={label}
        value={value}
        onChange={onChange}
      >
        {options &&
          options.map((item, index) => (
            <Option
              data-testid="select-option"
              aria-selected={item.label === defaultOption ? "selected" : ""}
              key={index}
              value={item.value}
            >
              {item.label}
            </Option>
          ))}
      </Select>
    </div>
  );
};

export default Dropdown;
