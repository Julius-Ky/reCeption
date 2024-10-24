import anyTest from "ava";
import { Worker } from "near-workspaces";
import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first"); // temp fix for node >v17

/**
 *  @typedef {import('near-workspaces').NearAccount} NearAccount
 *  @type {import('ava').TestFn<{worker: Worker, accounts: Record<string, NearAccount>}>}
 */
const test = anyTest;

test.beforeEach(async (t) => {
  // Create sandbox
  const worker = (t.context.worker = await Worker.init());

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount("test-account");

  // Get wasm file path from package.json test script in folder above
  await contract.deploy(process.argv[2]);

  //create test users
  const admin = await root.createSubAccount("admin");
  const user = await root.createSubAccount("user");

  // Save state for test runs, it is unique for each test
  t.context.accounts = { root, contract, admin, user };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown().catch((error) => {
    console.log("Failed to stop the Sandbox:", error);
  });
});

test("set_fee: should update the fee if called by the owner", async (t) => {
  const { contract, admin } = t.context.accounts;
  await contract.call(contract, "set_fee", {
    caller: admin._accountId,
    new_fee: "2000000",
  });
  const fee = await contract.view("get_fee", {});
  t.is(fee, "2000000");
});

test("should return null if the interactions for a user are empty", async (t) => {
  const { contract, user } = t.context.accounts;
  const interactions = await contract.view("get_interactions_by_user_id", {
    user_id: user._accountId,
  });
  t.is(interactions, null);
});

test("should sign interaction by user and retrieve it by user", async (t) => {
  const { contract, user } = t.context.accounts;
  await contract.call(contract, "sign_interaction", {
    user_id: user._accountId,
    vulnerability_type: "Reentrancy",
    network: "Ethereum",
  });

  await contract.call(contract, "sign_interaction", {
    user_id: user._accountId,
    vulnerability_type: "XSS",
    network: "NEAR",
  });
  let interactions = await contract.view("get_interactions_by_user_id", {
    user_id: user._accountId,
  });
  console.log(`Interactions: ${interactions}`);
  t.not(interactions, null);
});
