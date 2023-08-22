import Link from "next/link";
import { FC } from "react";

import {
  Footer,
  Form,
  FormStatus,
  Input,
  LoginHeader as Header,
} from "@/presentation/components";
import {
  SignupFormContextProvider,
  useSignupFormContext,
} from "@/presentation/contexts";

import styles from "./signup.module.css";

const Signup: FC = () => {
  return (
    <div className={styles.signup}>
      <Header />
      <SignupFormContextProvider>
        <Form formContext={useSignupFormContext} className={styles.form}>
          <h2>Criar conta</h2>
          <Input
            formContext={useSignupFormContext}
            type="text"
            name="name"
            placeholder="Digite seu nome"
            tooltip="email"
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
            tooltip="password"
          />
          <button data-testid={"submit"} disabled={true} type="submit">
            Entrar
          </button>
          <Link href="/login" className={styles.link}>
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
