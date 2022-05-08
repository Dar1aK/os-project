import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Close.module.css";

const WithClose =
  (Component: React.ElementType) =>
  ({ ...props }) => {
    const history = useNavigate();
    return (
      <div className={styles.container}>
        <div className={styles.close} onClick={() => history("/")}>
          X
        </div>
        <Component {...props} />
      </div>
    );
  };

export default WithClose;
