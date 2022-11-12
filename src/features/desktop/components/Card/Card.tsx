import React from "react";

import { Link } from "react-router-dom";

import styles from "./Card.module.css";

const Card = ({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) => (
  <Link to={link} className={styles.wrap}>
    {children}
  </Link>
);

export default Card;
