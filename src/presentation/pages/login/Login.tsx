import { FC } from "react";

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader as Header,
} from "@/presentation/components";
import { FormContextProvider } from "@/presentation/contexts";

import styles from "./login.module.css";

const Login: FC = () => {
  return (
    <div className={styles.login}>
      <Header />
      <FormContextProvider>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
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
