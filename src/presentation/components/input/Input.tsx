"use client";
import { ChangeEvent, ComponentProps, FC } from "react";

import { useFormContext } from "@/presentation/contexts";

import styles from "./input.module.css";

type InputProps = ComponentProps<"input"> & {
  tooltip: "email" | "password";
};

const Input: FC<InputProps> = ({ children, tooltip, ...props }) => {
  const { errors, onInputChange } = useFormContext();
  const error = errors[tooltip];
  const getStatus = () => {
    return error ? "🔴" : "🟢";
  };
  const getTitle = () => {
    return error || "Tudo certo!";
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onInputChange) onInputChange(event);
  };
  return (
    <div className={styles.inputWrap}>
      <input data-testid={props.name} {...props} onChange={handleInputChange} />
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
