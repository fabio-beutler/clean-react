import Image from "next/image";
import { FC } from "react";

import Logo from "@/presentation/components/logo/logo";
import Spinner from "@/presentation/components/spinner/spinner";

import styles from "./login.module.css";
const Login: FC = () => {
  return (
    <div className={styles.login}>
      <header className={styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para Programadores</h1>
      </header>
      <form className={styles.form}>
        <h2>Login</h2>
        <div className={styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={styles.status}>🔴</span>
        </div>
        <div className={styles.inputWrap}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <span className={styles.status}>🔴</span>
        </div>
        <button type="submit">Entrar</button>
        <span className={styles.link}>Criar conta</span>
        <div className={styles.errorWrap}>
          <Spinner className={styles.spinner} />
          <span className={styles.error}>Erro</span>
        </div>
      </form>
      <footer className={styles.footer}>asdf</footer>
    </div>
  );
};

export default Login;
