import React from "react";

import { Link } from "react-router-dom";

import Wrapper from "../../components/Wrapper";
import ErrorSvg from "../../assets/images/404.svg";

const notFound = () => (
  <Wrapper>
    <h1>Page not found</h1>
    <Link to="/">To main</Link>
    <img src={ErrorSvg} alt="404" />
  </Wrapper>
);

export default notFound;
