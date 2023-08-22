import Link from "next/link";
import { FC } from "react";

import { AddAccount, SaveAccessToken } from "@/domain/useCases";
import {
  Footer,
  Form,
  FormButton,
  FormStatus,
  Input,
  LoginHeader as Header,
} from "@/presentation/components";
import {
  SignupFormContextProvider,
  useSignupFormContext,
} from "@/presentation/contexts";
import { Validation } from "@/presentation/protocols";

import styles from "./signup.module.css";

type Props = {
  validation: Validation;
  addAccount: AddAccount;
  saveAccessToken: SaveAccessToken;
};

const Signup: FC<Props> = ({ validation, addAccount, saveAccessToken }) => {
  return (
    <div className={styles.signup}>
      <Header />
      <SignupFormContextProvider
        validation={validation}
        addAccount={addAccount}
        saveAccessToken={saveAccessToken}
      >
        <Form formContext={useSignupFormContext} className={styles.form}>
          <h2>Criar conta</h2>
          <Input
            formContext={useSignupFormContext}
            type="text"
            name="name"
            placeholder="Digite seu nome"
            tooltip="name"
          />
          <Input
            formContext={useSignupFormContext}
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            tooltip="email"
          />
          <Input
            formContext={useSignupFormContext}
            type="password"
            name="password"
            placeholder="Digite sua senha"
            tooltip="password"
          />
          <Input
            formContext={useSignupFormContext}
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
            tooltip="passwordConfirmation"
          />
          <FormButton formContext={useSignupFormContext} type="submit">
            Entrar
          </FormButton>
          <Link
            data-testid="login-link"
            href="/login"
            replace
            className={styles.link}
          >
            Voltar para Login
          </Link>
          <FormStatus formContext={useSignupFormContext} />
        </Form>
      </SignupFormContextProvider>
      <Footer />
    </div>
  );
};

export default Signup;
