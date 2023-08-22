"use client";
import { ComponentProps, FC } from "react";

import {
  useLoginFormContext,
  useSignupFormContext,
} from "@/presentation/contexts";

import styles from "./formButton.module.css";

type FormButtonProps = ComponentProps<"button"> & {
  formContext: typeof useLoginFormContext | typeof useSignupFormContext;
};
const FormButton: FC<FormButtonProps> = ({
  formContext,
  className,
  ...props
}) => {
  const { state } = formContext();
  return (
    <button
      className={`${styles.formButton} ${className}`}
      {...props}
      disabled={state.isFormInvalid}
      data-testid={props.type}
    >
      {props.children}
    </button>
  );
};

export default FormButton;
