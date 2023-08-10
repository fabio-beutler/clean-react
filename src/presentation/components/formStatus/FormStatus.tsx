import { FC } from "react";

import { Spinner } from "@/presentation/components";

import styles from "./formStatus.module.css";

const FormStatus: FC = () => {
  return (
    <div className={styles.errorWrap}>
      <Spinner className={styles.spinner} />
      <span className={styles.error}>Erro</span>
    </div>
  );
};

export default FormStatus;
