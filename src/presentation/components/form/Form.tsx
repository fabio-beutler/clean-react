"use client";
import { ComponentProps, FC, FormEvent } from "react";

import { useLoginFormContext } from "@/presentation/contexts";

const Form: FC<ComponentProps<"form">> = (props) => {
  const { onSubmit } = useLoginFormContext();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) onSubmit();
  };
  return (
    <form data-testid="form" onSubmit={handleSubmit} {...props}>
      {props.children}
    </form>
  );
};

export default Form;
