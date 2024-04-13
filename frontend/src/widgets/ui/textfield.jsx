import React from "react";
import { Input } from "@material-tailwind/react";

const TextField = ({ inputLabel }) => {
  return <Input variant="outlined" label={inputLabel} />;
};

export default TextField;
