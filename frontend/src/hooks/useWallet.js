import { useEffect, useState } from "react";
import { Wallet } from "../wallet/near";

const useWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [accountObj, setAccountObj] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const walletInstance = await Wallet();
      setWallet(walletInstance);
      setIsSignedIn(walletInstance.isSignedIn);
      setAccountId(walletInstance.accountId);
      setAccountObj(walletInstance.accountObj);

      if (walletInstance.isSignedIn) {
        const balanceInNear = (
          (await walletInstance.getBalance()) / 1e24
        ).toFixed(2);
        setBalance(balanceInNear);
      }
    };

    fetchData();
  }, []);

  return {
    wallet,
    isSignedIn,
    accountId,
    accountObj,
    balance,
  };
};

export default useWallet;
