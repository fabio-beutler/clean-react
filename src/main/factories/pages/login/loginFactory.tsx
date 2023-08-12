import { FC } from "react";

import { RemoteAuthentication } from "@/data/useCases/authentication";
import { AxiosHttpClient } from "@/infra/http/axiosHttpClient";
import { Login } from "@/presentation/pages";
import { ValidationBuilder } from "@/validation/builder/validationBuilder";
import { ValidationComposite } from "@/validation/validators";

export const MakeLogin: FC = () => {
  const url = "http://localhost:3000/api/login";
  const axiosHttpClient = new AxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field("email").email().required().build(),
    ...ValidationBuilder.field("password").required().min(5).build(),
  ]);
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  );
};
