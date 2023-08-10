"use client";
import { FC } from "react";

import { Spinner } from "@/presentation/components";
import { useFormContext } from "@/presentation/contexts";

import styles from "./formStatus.module.css";

const FormStatus: FC = () => {
  const { state, errorState } = useFormContext();
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {state.isLoading && <Spinner className={styles.spinner} />}
      {errorState.main && (
        <span className={styles.error}>{errorState.main}</span>
      )}
    </div>
  );
};

export default FormStatus;
