"use client";
import { ChangeEvent, ComponentProps, FC, useId } from "react";

import {
  useLoginFormContext,
  useSignupFormContext,
} from "@/presentation/contexts";

import styles from "./input.module.css";

type InputProps = ComponentProps<"input"> & {
  tooltip: "name" | "email" | "password" | "passwordConfirmation";
  formContext: typeof useLoginFormContext | typeof useSignupFormContext;
};

const Input: FC<InputProps> = ({
  children,
  tooltip,
  formContext,
  ...props
}) => {
  const { errors, onInputChange } = formContext();
  // @ts-ignore
  const error = errors[tooltip];
  const inputId = useId();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onInputChange) onInputChange(event);
  };
  return (
    <div className={styles.inputWrap}>
      <input
        data-testid={props.name}
        onChange={handleInputChange}
        id={props.name + inputId}
        {...props}
        placeholder=""
      />
      <label htmlFor={props.name + inputId}>{props.placeholder}</label>
      <span
        data-testid={`${props.name}-status`}
        title={error || "Tudo certo!"}
        className={styles.status}
      >
        {error ? "🔴" : "🟢"}
      </span>
    </div>
  );
};

export default Input;
