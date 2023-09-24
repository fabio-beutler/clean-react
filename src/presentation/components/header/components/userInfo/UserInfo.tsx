import { useRouter } from "next/router";

import { useApiContext } from "@/presentation/contexts";

import styles from "./userInfo.module.css";
const UserInfo = () => {
  const router = useRouter();
  const apiContext = useApiContext();
  function handleLogout() {
    apiContext.setCurrentAccount(undefined);
    router.replace("/login").finally();
  }
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
