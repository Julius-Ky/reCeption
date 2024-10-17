import logo from "../../assets/logo.jpg";
import Button from "../button/Button";
import { Link, NavLink } from "react-router-dom";
import { useBitteWallet } from "@mintbase-js/react";
import { useEffect, useState } from "react";
import { getBalance } from "@mintbase-js/rpc";
import BN from "bn.js";
import styles from "./Header.module.css";
import Menu from "../menu/Menu";

const RPC_URL = "https://rpc.testnet.near.org";
const YOCTO_NEAR = new BN("1000000000000000000000000"); // 10^24

const Header = () => {
  const { isConnected, selector, connect, activeAccountId } = useBitteWallet();
  const [balance, setBalance] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignout = async () => {
    const wallet = await selector.wallet();
    return wallet.signOut();
  };

  const handleSignIn = async () => {
    return connect();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {
        const balanceData = await getBalance({
          accountId: activeAccountId,
          rpcUrl: RPC_URL,
        });
        // Convert the balance to NEAR
        const balanceInNear = new BN(balanceData).div(YOCTO_NEAR).toString();
        setBalance(balanceInNear);
        console.log("balance (in NEAR):", balanceInNear);
      }
    };

    fetchData();
  }, [isConnected, activeAccountId]);

  return (
    <header>
      <nav className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="logo" width={36} />
          <h1>reCeption</h1>
        </Link>
        <div className={styles.navLinks}>
          <ul>
            <li>
              <NavLink
                to="features"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Features
              </NavLink>
            </li>
            <li>
              <NavLink
                to="docs"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Docs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="how"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                How it works
              </NavLink>
            </li>
            <li>
              <NavLink
                to="faq"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                FAQ
              </NavLink>
            </li>
          </ul>
          {!isConnected ? (
            <Button label={"Connect"} onClick={handleSignIn} />
          ) : (
            <div className={styles.buttons}>
              <p className={styles.balance}>
                {balance ? `${balance} NEAR` : "Fetching balance..."}
              </p>
              <Button
                type="primary"
                label={activeAccountId}
                onClick={toggleMenu}
              />
              {isMenuOpen && (
                <div className={styles.menu}>
                  <Menu onLogout={handleSignout} />
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
