import { FC, memo } from "react";

import styles from "./footer.module.css";

const Footer: FC = () => {
  return <footer className={styles.footer} />;
};

export default memo(Footer);
