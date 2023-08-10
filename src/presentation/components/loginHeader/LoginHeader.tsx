import { FC, memo } from "react";

import { Logo } from "@/presentation/components";

import styles from "./loginHeader.module.css";

const LoginHeader: FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  );
};

export default memo(LoginHeader);
