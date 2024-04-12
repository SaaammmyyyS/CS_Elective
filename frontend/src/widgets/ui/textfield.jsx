import React from "react";
import { Input } from "@material-tailwind/react";

const TextField = ({ inputLabel }) => {
  return (
    <div>
      <Input variant="outlined" label={inputLabel} />
    </div>
  );
};

export default TextField;
