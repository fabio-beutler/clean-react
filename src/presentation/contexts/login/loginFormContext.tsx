"use client";
import { useRouter } from "next/router";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Authentication, UpdateCurrentAccount } from "@/domain/useCases";
import { Validation } from "@/presentation/protocols/validation";

type ContextProps = {
  state: {
    isLoading: boolean;
    isFormInvalid: boolean;
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
  onInputChange: (name: string, value: string) => void;
  onSubmit: () => void;
};

type FormContextProviderProps = {
  children: ReactNode;
  validation: Validation;
  authentication: Authentication;
  updateCurrentAccount: UpdateCurrentAccount;
};

const initialState: ContextProps = {
  state: {
    isLoading: false,
    isFormInvalid: true,
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
  onInputChange: () => {},
  onSubmit: () => {},
};

const LoginFormContext = createContext<ContextProps>(initialState);

const LoginFormContextProvider: FC<FormContextProviderProps> = ({
  children,
  validation,
  authentication,
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

  const onInputChange = (name: string, value: string) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (): Promise<void> => {
    if (state.isLoading || state.isFormInvalid) return;
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));

      const account = await authentication.auth({
        email: inputs.email,
        password: inputs.password,
      });
      await updateCurrentAccount.save(account);
      await router.replace("/");
    } catch (error: any) {
      setState((prevState) => ({ ...prevState, isLoading: false }));

      setErrors((prevState) => ({ ...prevState, main: error.message }));
    }
  };

  useEffect(() => {
    const email = validation.validate("email", inputs);
    const password = validation.validate("password", inputs);
    setErrors((prevState) => ({
      ...prevState,
      email,
      password,
    }));
    setState((prevState) => ({
      ...prevState,
      isFormInvalid: !!email || !!password,
    }));
  }, [inputs, validation]);

  return (
    <LoginFormContext.Provider
      value={{ state, errors, inputs, onInputChange, onSubmit }}
    >
      {children}
    </LoginFormContext.Provider>
  );
};

export default LoginFormContextProvider;

export const useLoginFormContext = (): ContextProps =>
  useContext(LoginFormContext);
