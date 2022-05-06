import React, { FC } from "react";

import styles from "./Textarea.module.css";

const Textarea: FC<{
  classname?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ classname = "", ...props }) => (
  <textarea className={`${styles.txt} ${classname}`} {...props} />
);

export default Textarea;
