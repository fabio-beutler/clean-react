import { useRouter } from "next/router";

import { useApiContext } from "@/presentation/contexts";

type ResultType = () => void;

export const useLogout = (): ResultType => {
  const apiContext = useApiContext();
  const router = useRouter();
  return () => {
    apiContext.setCurrentAccount(undefined);
    router.replace("/login").finally();
  };
};
