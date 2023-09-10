import { FC } from "react";

import styles from "./error.module.css";

type Props = {
  errorMessage: string;
  onReload: () => void;
};

const Error: FC<Props> = ({ errorMessage, onReload }) => {
  function handleReload() {
    onReload();
  }

  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">{errorMessage}</span>
      <button type="button" data-testid="reload" onClick={handleReload}>
        Tentar novamente
      </button>
    </div>
  );
};

export default Error;
