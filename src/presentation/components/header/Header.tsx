import Link from "next/link";
import { useRouter } from "next/router";
import { FC, memo } from "react";

import { ACCOUNT_STORAGE_KEY } from "@/main/config";
import { Logo } from "@/presentation/components";
import { useApiContext } from "@/presentation/contexts";

import styles from "./header.module.css";

const Header: FC = () => {
  const apiContext = useApiContext();
  const router = useRouter();
  function handleLogout() {
    apiContext.setCurrentAccount(undefined);
    router.replace("/login").finally();
  }
  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.userInfoWrap}>
          <span>Fabio</span>
          <button onClick={handleLogout} data-testid="logout">
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
