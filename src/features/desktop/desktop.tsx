import React from "react";
import Wrapper from "../../components/Wrapper";
import Card from "./components/Card";

import styles from "./desktop.module.css";

const Desktop = () => {
  return (
    <Wrapper classname={styles.layout}>
      <Card link="/files">Open files</Card>
    </Wrapper>
  );
};

export default Desktop;