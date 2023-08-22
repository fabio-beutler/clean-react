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

import { AddAccount } from "@/domain/useCases";
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
  onSubmit?: () => void;
};

type FormContextProviderProps = {
  children: ReactElement;
  validation: Validation;
  addAccount: AddAccount;
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
  addAccount,
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

  const onSubmit = async (): Promise<void> => {
    if (
      state.isLoading ||
      errors.name ||
      errors.email ||
      errors.password ||
      errors.passwordConfirmation
    )
      return;
    try {
      setState({ isLoading: true });
      await addAccount.add({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        passwordConfirmation: inputs.passwordConfirmation,
      });
    } catch (error: any) {
      setState({ isLoading: false });
      setErrors((prevState) => ({ ...prevState, main: error.message }));
    }
  };

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
    <SignupFormContext.Provider
      value={{ state, errors, inputs, onInputChange, onSubmit }}
    >
      {children}
    </SignupFormContext.Provider>
  );
};

export default SignupFormContextProvider;

export const useSignupFormContext = (): ContextProps =>
  useContext(SignupFormContext);
