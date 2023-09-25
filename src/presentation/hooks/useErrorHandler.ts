import { useRouter } from "next/router";

import { AccessDeniedError } from "@/domain/errors";
import { useApiContext } from "@/presentation/contexts";

type CallbackType = (error: Error) => void;
type ResultType = CallbackType;

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const apiContext = useApiContext();
  const router = useRouter();
  return (error: Error) => {
    if (error instanceof AccessDeniedError) {
      apiContext.setCurrentAccount(undefined);
      router.replace("/login").finally();
    } else {
      callback(error);
    }
  };
};
