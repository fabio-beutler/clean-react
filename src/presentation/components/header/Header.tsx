import dynamic from "next/dynamic";
import { FC, memo } from "react";

import { Logo } from "@/presentation/components";

import styles from "./header.module.css";

const UserInfo = dynamic(
  () => import("./components").then((mod) => mod.UserInfo),
  { ssr: false },
);

const Header: FC = () => {
  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <UserInfo />
      </div>
    </header>
  );
};

export default memo(Header);
