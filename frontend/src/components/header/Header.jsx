import logo from "../../assets/logo.jpg";
import Button from "../button/Button";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useBitteWallet } from "@mintbase-js/react";

const Header = () => {
  const { isConnected, selector, connect, activeAccountId } = useBitteWallet();

  const handleSignout = async () => {
    const wallet = await selector.wallet();
    return wallet.signOut();
  };

  const handleSignIn = async () => {
    return connect();
  };
  return (
    <header>
      <nav className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" width={36} />
          <h1>reCeption</h1>
        </div>
        <div className={styles.navLinks}>
          <ul>
            <li>
              <NavLink className={() => {}} to="">
                Features
              </NavLink>
            </li>
            <li>
              <NavLink to="docs">Docs</NavLink>
            </li>
            <li>
              <NavLink to="">How it works</NavLink>
            </li>
            <li>
              <NavLink to="">FAQ</NavLink>
            </li>
          </ul>
          {!isConnected && <Button label={"Connect"} onClick={handleSignIn} />}
          {isConnected && (
            <Button label={"Disconnect"} onClick={handleSignout} />
          )}
        </div>
        {isConnected && <p>You are connected as {activeAccountId}</p>}
      </nav>
    </header>
  );
};

export default Header;
