import logo from "../../assets/logo.jpg";
import Button from "../button/Button";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useBitteWallet } from "@mintbase-js/react";
import { useEffect, useState } from "react";
import { getBalance } from "@mintbase-js/rpc";
import BN from "bn.js";

const RPC_URL = "https://rpc.testnet.near.org";
const YOCTO_NEAR = new BN("1000000000000000000000000"); // 10^24

const Header = () => {
  const { isConnected, selector, connect, activeAccountId } = useBitteWallet();
  const [balance, setBalance] = useState(null);

  const handleSignout = async () => {
    const wallet = await selector.wallet();
    return wallet.signOut();
  };

  const handleSignIn = async () => {
    return connect();
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
                onClick={handleSignout}
              />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
