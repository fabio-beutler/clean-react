"use client";
import { FC, ReactNode } from "react";

import { AccountModel } from "@/domain/models";
import { ApiContext } from "@/presentation/contexts/api/apiContext";

type ContextProviderProps = {
  children: ReactNode;
  setCurrentAccount: (account: AccountModel) => void;
};

const MockApiContextProvider: FC<ContextProviderProps> = ({
  children,
  setCurrentAccount,
}) => {
  return (
    <ApiContext.Provider value={{ setCurrentAccount }}>
      {children}
    </ApiContext.Provider>
  );
};

export default MockApiContextProvider;
