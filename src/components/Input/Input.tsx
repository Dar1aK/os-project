import React, { FC } from "react";

import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: FC<InputProps> = ({ className = "", ...props }) => (
  <input className={`${styles.input} ${className}`} {...props} />
);

export default Input;
