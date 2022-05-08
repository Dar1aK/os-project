import React, { FC } from "react";

import styles from "./Input.module.css";

const Input: FC<{
  classname?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "password";
}> = ({ classname = "", ...props }) => (
  <input className={`${styles.input} ${classname}`} {...props} />
);

export default Input;
