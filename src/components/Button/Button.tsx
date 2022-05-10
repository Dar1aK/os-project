import React, { FC } from "react";

import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: FC<ButtonProps> = ({ className = "", value, ...props }) => (
  <button className={`${styles.btn} ${className}`} {...props}>
    {value}
  </button>
);

export default Button;
