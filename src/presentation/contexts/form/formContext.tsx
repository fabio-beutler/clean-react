"use client";

import {
  ChangeEvent,
  createContext,
  FC,
  FormEvent,
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
  onSubmit?: () => void;
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
  const [state, setState] = useState<ContextProps["state"]>(
    initialState["state"],
  );
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

  const onSubmit = () => {
    setState({ isLoading: true });
  };

  useEffect(() => {
    setErrors((prevState) => ({
      ...prevState,
      email: validation.validate("email", inputs.email),
      password: validation.validate("password", inputs.password),
    }));
  }, [inputs.email, inputs.password, validation]);

  return (
    <FormContext.Provider
      value={{ state, errors, inputs, onInputChange, onSubmit }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;

export const useFormContext = (): ContextProps => useContext(FormContext);
