"use client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import { useApiContext } from "@/presentation/contexts";

type Props = {
  children: ReactNode;
};

const PrivateRoute: NextPage<Props> = ({ children }: Props) => {
  const apiContext = useApiContext();
  const router = useRouter();
  useEffect(() => {
    if (!apiContext.getCurrentAccount()) {
      router.push("/login");
    }
  }, []);
  return children;
};

export default PrivateRoute;
