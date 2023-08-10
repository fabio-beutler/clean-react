"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";

type ContextProps = {
  state: {
    isLoading: boolean;
  };
  errorState: {
    email: string;
    password: string;
    main: string;
  };
};

type FormContextProviderProps = {
  children: ReactNode;
};

const initialState: ContextProps = {
  state: {
    isLoading: false,
  },
  errorState: {
    email: "Campo obrigatório",
    password: "Campo obrigatório",
    main: "",
  },
};

const FormContext = createContext<ContextProps>(initialState);

const FormContextProvider: FC<FormContextProviderProps> = ({ children }) => {
  const [state] = useState<ContextProps["state"]>(initialState.state);
  const [errorState] = useState<ContextProps["errorState"]>(
    initialState.errorState,
  );
  return (
    <FormContext.Provider value={{ state, errorState }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;

export const useFormContext = (): ContextProps => useContext(FormContext);
