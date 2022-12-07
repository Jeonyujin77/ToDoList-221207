import React from "react";
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  let location = useLocation();
  return <div>{location.pathname.split("/error/")[1]}</div>;
};

export default ErrorPage;
