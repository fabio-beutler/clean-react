import { ComponentProps, FC } from "react";

import styles from "./spinner.module.css";
const Spinner: FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return (
    <div className={`${styles["lds-ellipsis"]} ${className}`} {...props}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
