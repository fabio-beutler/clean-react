"use client";
import { useRouter } from "next/router";
import {
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

import { AddAccount } from "@/domain/useCases";
import { useApiContext } from "@/presentation/contexts";
import { Validation } from "@/presentation/protocols";

type ContextProps = {
  state: {
    isLoading: boolean;
    isFormInvalid: boolean;
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
  onInputChange: (name: string, value: string) => void;
  onSubmit: () => void;
};

type FormContextProviderProps = {
  children: ReactElement;
  validation: Validation;
  addAccount: AddAccount;
};

const initialState: ContextProps = {
  state: {
    isLoading: false,
    isFormInvalid: true,
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
  onInputChange: () => {},
  onSubmit: () => {},
};

const SignupFormContext = createContext<ContextProps>(initialState);

const SignupFormContextProvider: FC<FormContextProviderProps> = ({
  children,
  validation,
  addAccount,
}) => {
  const router = useRouter();
  const apiContext = useApiContext();
  const [state, setState] = useState<ContextProps["state"]>(
    initialState["state"],
  );
  const [errors, setErrors] = useState<ContextProps["errors"]>(
    initialState["errors"],
  );
  const [inputs, setInputs] = useState<ContextProps["inputs"]>(
    initialState["inputs"],
  );

  const onInputChange = (name: string, value: string) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (): Promise<void> => {
    if (state.isLoading || state.isFormInvalid) return;
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      const account = await addAccount.add({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        passwordConfirmation: inputs.passwordConfirmation,
      });
      apiContext.setCurrentAccount(account);
      await router.replace("/");
    } catch (error: any) {
      setState((prevState) => ({ ...prevState, isLoading: false }));
      setErrors((prevState) => ({ ...prevState, main: error.message }));
    }
  };

  useEffect(() => {
    const name = validation.validate("name", inputs);
    const email = validation.validate("email", inputs);
    const password = validation.validate("password", inputs);
    const passwordConfirmation = validation.validate(
      "passwordConfirmation",
      inputs,
    );
    setErrors((prevState) => ({
      ...prevState,
      name,
      email,
      password,
      passwordConfirmation,
    }));
    setState((prevState) => ({
      ...prevState,
      isFormInvalid: !!name || !!email || !!password || !!passwordConfirmation,
    }));
  }, [inputs, validation]);

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
