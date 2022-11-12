import { useAppSelector } from "../../app/hooks";

import { selectName } from "../../features/auth/authSlice";

import styles from "./Header.module.css";

const Header = () => {
  const name = useAppSelector(selectName);
  if (name) {
    return <header className={styles.header}>Hello, {name} 👋</header>;
  }
  return null;
};

export default Header;
