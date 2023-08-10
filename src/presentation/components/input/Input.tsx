import { ComponentProps, FC } from "react";

import styles from "./input.module.css";
const Input: FC<ComponentProps<"input">> = ({ children, ...props }) => {
  return (
    <div className={styles.inputWrap}>
      <input {...props} />
      <span className={styles.status}>🔴</span>
    </div>
  );
};

export default Input;
