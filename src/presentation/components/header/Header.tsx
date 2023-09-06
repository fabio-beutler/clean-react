import { FC, memo } from "react";

import { Logo } from "@/presentation/components";

import styles from "./header.module.css";

const Header: FC = () => {
  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.userInfoWrap}>
          <span>Fabio</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
