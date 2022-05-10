import React from "react";

import Clock from "../Clock";

import styles from "./Footer.module.css";

const Footer = () => {
  const date = new Date();
  return (
    <footer className={styles.footer}>
      <Clock /> {date.toLocaleDateString()}
    </footer>
  );
};

export default Footer;
