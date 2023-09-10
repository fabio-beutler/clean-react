import Link from "next/link";
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
          <Link href="#">Sair</Link>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
