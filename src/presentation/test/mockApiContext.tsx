"use client";
import { FC, ReactNode } from "react";

import { AccountModel } from "@/domain/models";
import { ApiContext } from "@/presentation/contexts/api/apiContext";

type ContextProviderProps = {
  children: ReactNode;
  setCurrentAccount?: (account: AccountModel | undefined) => void;
  getCurrentAccount?: () => AccountModel;
};

const MockApiContextProvider: FC<ContextProviderProps> = ({
  children,
  setCurrentAccount = vi.fn(),
  getCurrentAccount = vi.fn(),
}) => {
  return (
    <ApiContext.Provider value={{ setCurrentAccount, getCurrentAccount }}>
      {children}
    </ApiContext.Provider>
  );
};

export default MockApiContextProvider;
