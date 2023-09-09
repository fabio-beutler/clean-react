import { NextPage } from "next";
import { NextRouter, withRouter } from "next/router";
import { ReactNode } from "react";

import { useApiContext } from "@/presentation/contexts";

type Props = {
  children: ReactNode;
  router: NextRouter;
};

const PrivateRoute: NextPage<Props> = ({ children, router }: Props) => {
  const apiContext = useApiContext();
  if (!apiContext.getCurrentAccount()) {
    router.push("/login").finally();
  }
  return children;
};

export default withRouter(PrivateRoute);
