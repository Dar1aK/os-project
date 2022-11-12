import { Link } from "react-router-dom";

import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Card from "./components/Card";

import styles from "./desktop.module.css";

const Desktop = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <div className={styles.layout}>
          <Card link="/files">📁 Open files</Card>
          <Card link="/camera">📸 Access to camera</Card>
          <Card link="/gallery">🖼️ Gallery</Card>
        </div>
        <Link to="/auth">&#60; You can relogin here</Link>
      </Wrapper>
    </>
  );
};

export default Desktop;
