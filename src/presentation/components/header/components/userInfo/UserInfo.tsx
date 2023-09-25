import { useApiContext } from "@/presentation/contexts";
import { useLogout } from "@/presentation/hooks";

import styles from "./userInfo.module.css";
const UserInfo = () => {
  const apiContext = useApiContext();
  const handleLogout = useLogout();

  return (
    <div className={styles.userInfoWrap}>
      <span data-testid="username">{apiContext.getCurrentAccount()?.name}</span>
      <button onClick={handleLogout} data-testid="logout">
        Sair
      </button>
    </div>
  );
};

export default UserInfo;
