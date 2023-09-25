"use client";
import { ComponentProps, FC, FormEvent } from "react";

import {
  useLoginFormContext,
  useSignupFormContext,
} from "@/presentation/contexts";

import styles from "./form.module.css";

type FormProps = ComponentProps<"form"> & {
  formContext: typeof useLoginFormContext | typeof useSignupFormContext;
};

const Form: FC<FormProps> = ({ formContext, ...props }) => {
  const { onSubmit } = formContext();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) onSubmit();
  };
  return (
    <form
      data-testid="form"
      onSubmit={handleSubmit}
      className={styles.form}
      {...props}
    >
      {props.children}
    </form>
  );
};

export default Form;
