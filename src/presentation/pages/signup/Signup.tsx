import Link from "next/link";
import { FC } from "react";

import { AccountModel } from "@/domain/models";
import { Authentication, SaveAccessToken } from "@/domain/useCases";
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

import styles from "./signup.module.css";

const Signup: FC = () => {
  const validation: Validation = {
    validate: () => {
      return "";
    },
  };
  const authentication: Authentication = {
    auth: () => {
      return new Promise<AccountModel>((resolve) =>
        resolve({ accessToken: "" }),
      );
    },
  };
  const saveAccessToken: SaveAccessToken = {
    save: () => {
      return new Promise((resolve) => resolve());
    },
  };
  return (
    <div className={styles.signup}>
      <Header />
      <LoginFormContextProvider
        validation={validation}
        authentication={authentication}
        saveAccessToken={saveAccessToken}
      >
        <Form className={styles.form}>
          <h2>Criar conta</h2>
          <Input
            type="text"
            name="name"
            placeholder="Digite seu nome"
            tooltip="email"
          />
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
          <Input
            type="password"
            name="paddwordConfirmation"
            placeholder="Repita sua senha"
            tooltip="password"
          />
          <FormButton type="submit">Entrar</FormButton>
          <Link href="/login" className={styles.link}>
            Voltar para Login
          </Link>
          <FormStatus />
        </Form>
      </LoginFormContextProvider>
      <Footer />
    </div>
  );
};

export default Signup;
