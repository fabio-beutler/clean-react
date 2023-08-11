"use client";
import { FC } from "react";

import { Spinner } from "@/presentation/components";
import { useFormContext } from "@/presentation/contexts";

import styles from "./formStatus.module.css";

const FormStatus: FC = () => {
  const { state, errors } = useFormContext();
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {state.isLoading && (
        <Spinner data-testid="spinner" className={styles.spinner} />
      )}
      {errors.main && (
        <span data-testid="main-error" className={styles.error}>
          {errors.main}
        </span>
      )}
    </div>
  );
};

export default FormStatus;
