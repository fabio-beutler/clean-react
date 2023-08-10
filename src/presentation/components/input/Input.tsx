"use client";
import { ComponentProps, FC } from "react";

import { useFormContext } from "@/presentation/contexts";

import styles from "./input.module.css";

type InputProps = ComponentProps<"input"> & {
  tooltip: "email" | "password";
};

const Input: FC<InputProps> = ({ children, tooltip, ...props }) => {
  const { errorState } = useFormContext();
  const error = errorState[tooltip];
  const getStatus = () => {
    return "🔴";
  };
  const getTitle = () => {
    return error;
  };
  return (
    <div className={styles.inputWrap}>
      <input {...props} />
      <span
        data-testid={`${tooltip}-status`}
        title={getTitle()}
        className={styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
