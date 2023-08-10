"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";

type ContextProps = {
  isLoading: boolean;
  errorMessage: string;
};

type FormContextProviderProps = {
  children: ReactNode;
};

const initialState: ContextProps = {
  isLoading: false,
  errorMessage: "",
};

const FormContext = createContext<ContextProps>(initialState);

const FormContextProvider: FC<FormContextProviderProps> = ({ children }) => {
  const [state] = useState<ContextProps>(initialState);
  return <FormContext.Provider value={state}>{children}</FormContext.Provider>;
};

export default FormContextProvider;

export const useFormContext = (): ContextProps => useContext(FormContext);
