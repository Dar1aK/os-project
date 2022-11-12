import React from "react";

import styles from "./Wrapper.module.css";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  withoutHeader?: boolean;
}

const Wrapper = ({ children, className = "", withoutHeader }: WrapperProps) => (
  <div
    className={`${styles.wrap} ${
      withoutHeader ? styles["wrap--without"] : ""
    } ${className}`}
  >
    {children}
  </div>
);

export default Wrapper;
