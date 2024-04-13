import React from "react";
import { Input } from "@material-tailwind/react";

const TextField = ({ inputLabel }) => {
  console.log(inputLabel);
  return <Input variant="outlined" label={inputLabel} />;
};

export default TextField;
