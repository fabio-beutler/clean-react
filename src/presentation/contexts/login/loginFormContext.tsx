"use client";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Authentication } from "@/domain/useCases";
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
  authentication: Authentication;
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

const LoginFormContext = createContext<ContextProps>(initialState);

const LoginFormContextProvider: FC<FormContextProviderProps> = ({
  children,
  validation,
  authentication,
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
    if (state.isLoading || errors.email || errors.password) return;
    try {
      setState({ isLoading: true });
      const account = await authentication.auth({
        email: inputs.email,
        password: inputs.password,
      });
      localStorage.setItem("accessToken", account.accessToken);
      router.replace("/");
    } catch (error: any) {
      setState({ isLoading: false });
      setErrors((prevState) => ({ ...prevState, main: error.message }));
    }
  };

  useEffect(() => {
    setErrors((prevState) => ({
      ...prevState,
      email: validation.validate("email", inputs.email),
      password: validation.validate("password", inputs.password),
    }));
  }, [inputs.email, inputs.password, validation]);

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
