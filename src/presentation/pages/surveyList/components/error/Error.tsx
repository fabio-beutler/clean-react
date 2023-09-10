import { FC } from "react";

import styles from "./error.module.css";

type Props = {
  errorMessage: string;
};

const Error: FC<Props> = ({ errorMessage }) => {
  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">{errorMessage}</span>
      <button>Recarregar</button>
    </div>
  );
};

export default Error;
