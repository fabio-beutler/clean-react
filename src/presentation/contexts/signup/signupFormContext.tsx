"use client";
import {
  ChangeEvent,
  createContext,
  FC,
  ReactElement,
  useContext,
  useState,
} from "react";

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
    email: string;
    password: string;
  };
  onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

type FormContextProviderProps = {
  children: ReactElement;
};

const initialState: ContextProps = {
  state: {
    isLoading: false,
  },
  errors: {
    name: "Campo obrigatório",
    email: "Campo obrigatório",
    password: "Campo obrigatório",
    passwordConfirmation: "Campo obrigatório",
    main: "",
  },
  inputs: {
    email: "",
    password: "",
  },
};

const SignupFormContext = createContext<ContextProps>(initialState);

const SignupFormContextProvider: FC<FormContextProviderProps> = ({
  children,
}) => {
  const [state] = useState<ContextProps["state"]>(initialState["state"]);
  const [errors] = useState<ContextProps["errors"]>(initialState["errors"]);
  const [inputs] = useState<ContextProps["inputs"]>(initialState["inputs"]);

  return (
    <SignupFormContext.Provider value={{ state, errors, inputs }}>
      {children}
    </SignupFormContext.Provider>
  );
};

export default SignupFormContextProvider;

export const useSignupFormContext = (): ContextProps =>
  useContext(SignupFormContext);
