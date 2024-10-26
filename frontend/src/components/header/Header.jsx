import logo from "../../assets/logo.jpg";
import Button from "../button/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.css";
import Menu from "../menu/Menu";
import useWallet from "../../hooks/useWallet";

const Header = () => {
  const { wallet, isSignedIn, accountId, balance } = useWallet();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleSignout = async () => {
    await wallet.signOut();
    setIsMenuOpen(false);
    window.location.reload();
  };

  const handleSignIn = async () => {
    return wallet.signIn();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (wallet && wallet.fetchOwner) {
      wallet.fetchOwner().then(console.log).catch(console.error);
    }
  };

  const onUpload = () => {
    navigate("/upload");
    setIsMenuOpen(false);
  };

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
          {!isSignedIn ? (
            <Button label={"Connect"} onClick={handleSignIn} />
          ) : (
            <div className={styles.buttons}>
              <p className={styles.balance}>
                {balance ? `${balance} NEAR` : "Fetching balance..."}
              </p>
              <Button type="primary" label={accountId} onClick={toggleMenu} />
              {isMenuOpen && (
                <div className={styles.menu}>
                  <Menu onLogout={handleSignout} onUpload={onUpload} />
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
