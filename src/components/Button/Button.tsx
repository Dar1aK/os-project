import React, { FC } from "react";

import styles from "./Button.module.css";

const Button: FC<{
  classname?: string;
  name?: string;
  id?: string;
  value: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: "submit" | "button";
}> = ({ classname = "", value, ...props }) => (
  <button className={`${styles.btn} ${classname}`} {...props}>
    {value}
  </button>
);

export default Button;
