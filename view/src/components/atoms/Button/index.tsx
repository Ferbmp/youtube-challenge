"use client";

import React from "react";
import { Button as MuiButton, ButtonProps } from "@mui/material";

const Button: React.FC<ButtonProps> = (props) => {
  return <MuiButton {...props}>{props.children}</MuiButton>;
};

export default Button;
