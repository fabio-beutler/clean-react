"use client";

import {
  ChangeEvent,
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Validation } from "@/presentation/protocols/validation";

type ContextProps = {
  state: {
    isLoading: boolean;
  };
  errors: {
    email: string;
    password: string;
    main: string;
  };
  inputs: {
    email: string;
    password: string;
  };
  onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

type FormContextProviderProps = {
  children: ReactNode;
  validation: Validation;
};

const initialState: ContextProps = {
  state: {
    isLoading: false,
  },
  errors: {
    email: "",
    password: "",
    main: "",
  },
  inputs: {
    email: "",
    password: "",
  },
};

const FormContext = createContext<ContextProps>(initialState);

const FormContextProvider: FC<FormContextProviderProps> = ({
  children,
  validation,
}) => {
  const [state] = useState<ContextProps["state"]>(initialState["state"]);
  const [errors, setErrors] = useState<ContextProps["errors"]>(
    initialState["errors"],
  );
  const [inputs, setInputs] = useState<ContextProps["inputs"]>(
    initialState["inputs"],
  );

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    setErrors((prevState) => ({
      ...prevState,
      email: validation.validate("email", inputs.email),
      password: validation.validate("password", inputs.password),
    }));
  }, [inputs.email, inputs.password, validation]);

  return (
    <FormContext.Provider value={{ state, errors, inputs, onInputChange }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;

export const useFormContext = (): ContextProps => useContext(FormContext);
