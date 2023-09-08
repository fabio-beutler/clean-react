"use client";
import { createContext, FC, ReactNode, useContext } from "react";

import { AccountModel } from "@/domain/models";
import { setCurrentAccountAdapter } from "@/main/adapters";

type ContextProps = {
  setCurrentAccount: (account: AccountModel) => void;
};

type ContextProviderProps = {
  children: ReactNode;
};

const initialState: ContextProps = {
  setCurrentAccount: () => {},
};

export const ApiContext = createContext<ContextProps>(initialState);

const ApiContextProvider: FC<ContextProviderProps> = ({ children }) => {
  return (
    <ApiContext.Provider
      value={{ setCurrentAccount: setCurrentAccountAdapter }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;

export const useApiContext = (): ContextProps => useContext(ApiContext);
