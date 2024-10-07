"use client";
import React from "react";
import { TextField as MuiTextField, TextFieldProps } from "@mui/material";

const TextField: React.FC<TextFieldProps> = (props) => {
  return <MuiTextField {...props} />;
};

export default TextField;
