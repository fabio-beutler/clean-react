"use client";
import {
  ChangeEvent,
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

import { Validation } from "@/presentation/protocols";

type ContextProps = {
  state: {
    isLoading: boolean;
  };
  errors: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    main: string;
  };
  inputs: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
  onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

type FormContextProviderProps = {
  children: ReactElement;
  validation: Validation;
};

const initialState: ContextProps = {
  state: {
    isLoading: false,
  },
  errors: {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    main: "",
  },
  inputs: {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  },
};

const SignupFormContext = createContext<ContextProps>(initialState);

const SignupFormContextProvider: FC<FormContextProviderProps> = ({
  children,
  validation,
}) => {
  const [state] = useState<ContextProps["state"]>(initialState["state"]);
  const [errors, setErrors] = useState<ContextProps["errors"]>(
    initialState["errors"],
  );
  const [inputs] = useState<ContextProps["inputs"]>(initialState["inputs"]);

  useEffect(() => {
    setErrors((prevState) => ({
      ...prevState,
      name: validation.validate("name", inputs.name),
      email: validation.validate("email", inputs.email),
      password: validation.validate("password", inputs.password),
      passwordConfirmation: validation.validate(
        "passwordConfirmation",
        inputs.passwordConfirmation,
      ),
    }));
  }, [
    inputs.name,
    inputs.email,
    inputs.password,
    inputs.passwordConfirmation,
    validation,
  ]);

  return (
    <SignupFormContext.Provider value={{ state, errors, inputs }}>
      {children}
    </SignupFormContext.Provider>
  );
};

export default SignupFormContextProvider;

export const useSignupFormContext = (): ContextProps =>
  useContext(SignupFormContext);
