import React from "react";
import Wrapper from "../../components/Wrapper";
import Card from "./components/Card";

import styles from "./desktop.module.css";

const Desktop = () => {
  return (
    <Wrapper>
      <div className={styles.layout}>
        <Card link="/files">Open files</Card>
        <Card link="/camera">Access to camera</Card>
        <Card link="/gallery">Gallery</Card>
      </div>
    </Wrapper>
  );
};

export default Desktop;
