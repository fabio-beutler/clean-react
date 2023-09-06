import Link from "next/link";
import { FC } from "react";

import { Authentication, UpdateCurrentAccount } from "@/domain/useCases";
import {
  Footer,
  Form,
  FormButton,
  FormStatus,
  Input,
  LoginHeader as Header,
} from "@/presentation/components";
import {
  LoginFormContextProvider,
  useLoginFormContext,
} from "@/presentation/contexts";
import { Validation } from "@/presentation/protocols/validation";

import styles from "./login.module.css";

type Props = {
  validation: Validation;
  authentication: Authentication;
  updateCurrentAccount: UpdateCurrentAccount;
};
const Login: FC<Props> = ({
  validation,
  authentication,
  updateCurrentAccount,
}) => {
  return (
    <div className={styles.loginWrap}>
      <Header />
      <LoginFormContextProvider
        validation={validation}
        authentication={authentication}
        updateCurrentAccount={updateCurrentAccount}
      >
        <Form formContext={useLoginFormContext}>
          <h2>Login</h2>
          <Input
            formContext={useLoginFormContext}
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            tooltip="email"
          />
          <Input
            formContext={useLoginFormContext}
            type="password"
            name="password"
            placeholder="Digite sua senha"
            tooltip="password"
          />
          <FormButton formContext={useLoginFormContext} type="submit">
            Entrar
          </FormButton>
          <Link
            data-testid="signup-link"
            href="/signup"
            replace
            className={styles.link}
          >
            Criar conta
          </Link>
          <FormStatus formContext={useLoginFormContext} />
        </Form>
      </LoginFormContextProvider>
      <Footer />
    </div>
  );
};

export default Login;
