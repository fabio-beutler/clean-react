import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PrivateRoute: FC<Props> = () => {
  const router = useRouter();
  router.push("/login");
  return <></>;
};

export default PrivateRoute;
