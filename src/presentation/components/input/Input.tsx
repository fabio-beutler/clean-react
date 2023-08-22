"use client";
import { ChangeEvent, ComponentProps, FC } from "react";

import {
  useLoginFormContext,
  useSignupFormContext,
} from "@/presentation/contexts";

import styles from "./input.module.css";

type InputProps = ComponentProps<"input"> & {
  tooltip: "email" | "password";
  formContext: typeof useLoginFormContext | typeof useSignupFormContext;
};

const Input: FC<InputProps> = ({
  children,
  tooltip,
  formContext,
  ...props
}) => {
  const { errors, onInputChange } = formContext();
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
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
