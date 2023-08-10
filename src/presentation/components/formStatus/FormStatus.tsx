"use client";
import { FC } from "react";

import { Spinner } from "@/presentation/components";
import { useFormContext } from "@/presentation/contexts";

import styles from "./formStatus.module.css";

const FormStatus: FC = () => {
  const { isLoading, errorMessage } = useFormContext();
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner} />}
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};

export default FormStatus;
