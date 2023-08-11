import { ComponentProps, FC } from "react";

import { useFormContext } from "@/presentation/contexts";

const FormButton: FC<ComponentProps<"button">> = (props) => {
  const { errors } = useFormContext();
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
