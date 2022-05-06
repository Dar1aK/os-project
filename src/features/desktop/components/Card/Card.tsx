import React, { FC } from "react";

import { Link } from "react-router-dom";

import styles from "./Card.module.css";

const Card: FC<{ children: React.ReactNode; link: string }> = ({
  children,
  link,
}) => (
  <Link to={link} className={styles.wrap}>
    {children}
  </Link>
);

export default Card;
