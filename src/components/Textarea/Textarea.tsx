import React, { FC } from "react";

import styles from "./Textarea.module.css";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea: FC<TextareaProps> = ({ className = "", ...props }) => (
  <textarea className={`${styles.txt} ${className}`} {...props} />
);

export default Textarea;
