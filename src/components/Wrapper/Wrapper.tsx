import React, { FC } from "react";

import styles from "./Wrapper.module.css";

const Wrapper: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => <div className={`${styles.wrap} ${className}`}>{children}</div>;

export default Wrapper;
