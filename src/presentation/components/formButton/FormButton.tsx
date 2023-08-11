"use client";
import { ComponentProps, FC } from "react";

import { useLoginFormContext } from "@/presentation/contexts";

const FormButton: FC<ComponentProps<"button">> = (props) => {
  const { errors } = useLoginFormContext();
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
