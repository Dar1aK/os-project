import React, { FC } from "react";

import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const buttonColor = (color = "") => {
  switch (color) {
    case "gray":
      return "color-gray";
    case "dark":
      return "color-dark";
    case "primary":
    default:
      return "color-primary";
  }
};

const Button: FC<ButtonProps> = ({
  className = "",
  value,
  color,
  ...props
}) => (
  <button
    className={`${styles.btn} ${
      styles[`btn--${buttonColor(color)}`]
    } ${className}`}
    {...props}
  >
    {value}
  </button>
);

export default Button;
