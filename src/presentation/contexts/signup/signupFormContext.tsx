"use client";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

import { AddAccount, UpdateCurrentAccount } from "@/domain/useCases";
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
  onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
};

type FormContextProviderProps = {
  children: ReactElement;
  validation: Validation;
  addAccount: AddAccount;
  updateCurrentAccount: UpdateCurrentAccount;
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
};

const SignupFormContext = createContext<ContextProps>(initialState);

const SignupFormContextProvider: FC<FormContextProviderProps> = ({
  children,
  validation,
  addAccount,
  updateCurrentAccount,
}) => {
  const router = useRouter();
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
    if (state.isLoading || state.isFormInvalid) return;
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      const account = await addAccount.add({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        passwordConfirmation: inputs.passwordConfirmation,
      });
      await updateCurrentAccount.save(account);
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
