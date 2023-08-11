import Link from "next/link";
import { FC } from "react";

import { Authentication } from "@/domain/useCases";
import {
  Footer,
  Form,
  FormButton,
  FormStatus,
  Input,
  LoginHeader as Header,
} from "@/presentation/components";
import { LoginFormContextProvider } from "@/presentation/contexts";
import { Validation } from "@/presentation/protocols/validation";

import styles from "./login.module.css";

type Props = {
  validation: Validation;
  authentication: Authentication;
};
const Login: FC<Props> = ({ validation, authentication }) => {
  return (
    <div className={styles.login}>
      <Header />
      <LoginFormContextProvider
        validation={validation}
        authentication={authentication}
      >
        <Form className={styles.form}>
          <h2>Login</h2>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            tooltip="email"
          />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            tooltip="password"
          />
          <FormButton type="submit">Entrar</FormButton>
          <Link href="/signUp" data-testid="signUp" className={styles.link}>
            Criar conta
          </Link>
          <FormStatus />
        </Form>
      </LoginFormContextProvider>
      <Footer />
    </div>
  );
};

export default Login;
