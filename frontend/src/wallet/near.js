import { Buffer } from "buffer";
window.Buffer = Buffer;

import { connect, Contract, keyStores, WalletConnection } from "near-api-js";

const contractId = import.meta.env.VITE_CONTRACT_ADDRESS;

// Initialize NEAR connection
const nearConfig = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://testnet.mynearwallet.com/",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://testnet.nearblocks.io",
};

export const Wallet = async () => {
  // Connect to NEAR
  const near = await connect(nearConfig);
  const wallet = new WalletConnection(near, "reCeption");

  const isSignedIn = wallet.isSignedIn();
  const accountId = wallet.getAccountId();
  const accountObj = wallet.account();

  const signIn = () => {
    wallet.requestSignIn({
      contractId,
      methodNames: [],
      successUrl: window.location.href,
      failureUrl: window.location.href,
    });
  };

  const signOut = () => {
    wallet.signOut();
  };

  const getBalance = async () => {
    const account = wallet.account();

    return (await account.getAccountBalance()).available;
  };

  // Contract Instance
  const contract = new Contract(wallet.account(), contractId, {
    viewMethods: ["get_owner", "get_fee", "get_interactions_by_user_id"],
    changeMethods: ["set_fee", "sign_interaction", "authorize_api_user"],
  });

  const fetchOwner = async () => {
    const owner = await contract.get_owner();
    return owner;
  };

  const fetchFee = async () => {
    const fee = await contract.get_fee();
    return fee;
  };

  const fetchInteractionsByUserId = async (user_id = "alice.test.near") => {
    const interactions = await contract.get_interactions_by_user_id({
      user_id,
    });
    return interactions;
  };

  // const fetchKey = async (user_id = "alice.test.near") => {
  //   const apiKey = await contract.get_api_user_key({
  //     user_id,
  //   });
  //   return apiKey;
  // };

  const setFee = async (new_fee = "2000000") => {
    const result = await contract.set_fee({
      caller: "admin.test.near",
      new_fee: new_fee.toString(),
    });
    return result;
  };

  const signInteraction = async (
    userId = "alice.test.near",
    vulnerabilityType = "Reentrancy",
    network = "Ethereum"
  ) => {
    await contract.sign_interaction({
      user_id: userId,
      vulnerability_type: vulnerabilityType,
      network: network,
    });
  };

  const authorizeApiUser = async (user_id = "alice.test.near") => {
    const result = await contract.authorize_api_user({ user_id });
    return result;
  };

  // const saveApiKey = async (user_id = "alice.test.near", tx) => {
  //   const result = await contract.save_api_user_key({ user_id, tx });
  //   return result;
  // };

  return {
    wallet,
    signIn,
    signOut,
    getBalance,
    isSignedIn,
    accountId,
    accountObj,
    fetchOwner,
    fetchFee,
    fetchInteractionsByUserId,
    // fetchKey,
    setFee,
    signInteraction,
    authorizeApiUser,
    // saveApiKey,
  };
};
