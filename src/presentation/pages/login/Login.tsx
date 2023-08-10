import { FC } from "react";

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader as Header,
} from "@/presentation/components";
import { FormContextProvider } from "@/presentation/contexts";
import { Validation } from "@/presentation/protocols/validation";

import styles from "./login.module.css";

type Props = {
  validation: Validation;
};
const Login: FC<Props> = ({ validation }) => {
  return (
    <div className={styles.login}>
      <Header />
      <FormContextProvider validation={validation}>
        <form className={styles.form}>
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
          <button data-testid="submit" type="submit" disabled>
            Entrar
          </button>
          <span className={styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </FormContextProvider>
      <Footer />
    </div>
  );
};

export default Login;
