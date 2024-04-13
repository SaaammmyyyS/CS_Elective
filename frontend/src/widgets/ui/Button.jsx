import { Button } from "@material-tailwind/react";
import React from "react";

const CustomButton = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default CustomButton;
