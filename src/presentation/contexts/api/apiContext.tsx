"use client";
import { createContext, FC, ReactNode, useContext } from "react";

import { AccountModel } from "@/domain/models";
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from "@/main/adapters";

type ContextProps = {
  setCurrentAccount: (account: AccountModel) => void;
  getCurrentAccount: () => AccountModel;
};

type ContextProviderProps = {
  children: ReactNode;
};

const initialState: ContextProps = {
  setCurrentAccount: () => {},
  getCurrentAccount: () => {
    return {
      accessToken: "",
      name: "",
    };
  },
};

export const ApiContext = createContext<ContextProps>(initialState);

const ApiContextProvider: FC<ContextProviderProps> = ({ children }) => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;

export const useApiContext = (): ContextProps => useContext(ApiContext);
