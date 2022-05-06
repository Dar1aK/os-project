import React, { FC } from "react";

import styles from "./Wrapper.module.css";

const Wrapper: FC<{ children: React.ReactNode; classname?: string }> = ({
  children,
  classname = "",
}) => <div className={`${styles.wrap} ${classname}`}>{children}</div>;

export default Wrapper;
