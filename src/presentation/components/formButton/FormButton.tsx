"use client";
import { ComponentProps, FC } from "react";

import {
  useLoginFormContext,
  useSignupFormContext,
} from "@/presentation/contexts";

type FormButtonProps = ComponentProps<"button"> & {
  formContext: typeof useLoginFormContext | typeof useSignupFormContext;
};
const FormButton: FC<FormButtonProps> = ({ formContext, ...props }) => {
  const { errors } = formContext();
  return (
    <button
      {...props}
      disabled={!!errors.email || !!errors.password}
      data-testid={props.type}
    >
      {props.children}
    </button>
  );
};

export default FormButton;
