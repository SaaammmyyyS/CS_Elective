import React from "react";
import { Input } from "@material-tailwind/react";

const TextField = ({ inputLabel, value, onChange }) => {
  return (
    <Input
      variant="outlined"
      label={inputLabel}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextField;
