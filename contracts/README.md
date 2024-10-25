# ReCeption Contract

The smart contract exposes five methods to enable storing and retrieving a reCeption interactions in the NEAR network.

```ts
@NearBindgen({})
class ReCeption {
  private owner: string = "admin.test.near";
  private fee: bigint = BigInt(1000000);
  private MAX_INTERACTIONS = 1000;
  private MAX_INPUT_LENGTH = 256;
  private interactions: UnorderedMap<string[]> = new UnorderedMap<string[]>(
    "i"
  );
  private api_users: UnorderedMap<boolean> = new UnorderedMap<boolean>("a");

  @view({})
  get_owner(): string {
    return this.owner;
  }

  @call({})
  set_fee({ caller, new_fee }: { caller: string; new_fee: bigint }): void {
    if (caller === this.owner) {
      if (new_fee > 0) {
        this.fee = new_fee;
        near.log(`Fee updated to: ${new_fee}`);
      } else {
        near.log("Fee must be greater than 0");
      }
    } else {
      near.log("Only the owner can set the fee");
    }
  }

  @view({})
  get_fee(): bigint {
    return this.fee;
  }

  @call({})
  sign_interaction({
    user_id,
    vulnerability_type,
    network,
  }: {
    user_id: string;
    vulnerability_type: string;
    network: string;
  }): void {
    let interactions = this.interactions.get(user_id) || [];
    if (interactions.length < this.MAX_INTERACTIONS) {
      if (
        user_id.length < this.MAX_INPUT_LENGTH &&
        vulnerability_type.length < this.MAX_INPUT_LENGTH &&
        network.length < this.MAX_INPUT_LENGTH
      ) {
        const interaction = `Vulnerability: ${vulnerability_type} | Network: ${network}`;
        interactions.push(interaction);
        this.interactions.set(user_id, interactions);
        near.log(`Interaction signed and stored for ${user_id}`);
      } else {
        near.log(`Invalid parameters length`);
      }
    } else {
      near.log(`Maximum interactions limit reached`);
    }
  }

  @view({})
  get_interactions_by_user_id({
    user_id,
  }: {
    user_id: string;
  }): string[] | null {
    return this.interactions.get(user_id);
  }

  @call({})
  authorize_api_user({ user_id }: { user_id: string }): void {
    if (user_id.length < this.MAX_INPUT_LENGTH) {
      this.api_users.set(user_id, true);
      near.log(`The api user ${user_id} is authorized`);
    } else {
      near.log(`Invalid user_id length`);
    }
  }

  @view({})
  get_api_user_authority({ user_id }: { user_id: string }): boolean | false {
    return this.api_users.get(user_id);
  }
}
```

<br />

# Quickstart

1. Make sure you have installed [node.js](https://nodejs.org/en/download/package-manager/) >= 16.
2. Install the [`NEAR CLI`](https://github.com/near/near-cli#setup)

<br />

## 1. install dependencies

Install dependencies by running:

```bash
npm install
```

<br />

## 1. Build and Test the Contract

You can automatically compile and test the contract by running:

```bash
npm run build
npm test
```

<br />

## 2. Create an Account and Deploy the Contract

You can create a new account and deploy the contract by running:

```bash
near create-account <your-account.testnet> --useFaucet
near deploy <your-account.testnet> build/reception.wasm
```

<br />

## 3. Retrieve the Owner and Fee

`get_owner` and `get_fee` are a read-only method (aka `view` method).

`View` methods can be called for **free** by anyone, even people **without a NEAR account**!

```bash
# Use near-cli to get the owner
near view <your-account.testnet> get_owner
# Use near-cli to get the fee
near view <your-account.testnet> get_fee
```

<br />

## 4. Setting Fee

`set_fee` changes the contract's state, for which it is a `call` method.

`Call` methods can only be invoked using a NEAR account, since the account needs to pay GAS for the transaction.

```bash
# Use near-cli to set new fee
near call <your-account.testnet> set_fee '{"caller": "admin.test.near", "new_fee": "2000000"}' --accountId <your-account.testnet>
```

<br />

## 5. Sign Interactions

`sign_interaction` changes the contract's state, for which it is a `call` method.

`Call` methods can only be invoked using a NEAR account, since the account needs to pay GAS for the transaction.

```bash
# Use near-cli to sign user interaction
near call <your-account.testnet> sign_interaction '{"user_id": "alice.test.near", "vulnerability_type": "Reentrancy", "network":"Ethereum"}' --accountId <your-account.testnet>
```

<br />

## 6. Retrieve User Interactions

`get_interactions_by_user_id` is a read-only method (aka `view` method).

`View` methods can be called for **free** by anyone, even people **without a NEAR account**!

```bash
# Use near-cli to get user interactions
near view <your-account.testnet> get_interactions_by_user_id '{"user_id":"alice.test.near"}'
```

<br />

## 7. Authorize api user

`authorize_api_user` changes the contract's state, for which it is a `call` method.

`Call` methods can only be invoked using a NEAR account, since the account needs to pay GAS for the transaction.

```bash
# Use near-cli to authorize api user
near call <your-account.testnet> authorize_api_user '{"user_id": "alice.test.near"}' --accountId <your-account.testnet>
```

<br />

## 6. Retrieve api user authority

`get_api_user_authority` is a read-only method (aka `view` method).

`View` methods can be called for **free** by anyone, even people **without a NEAR account**!

```bash
# Use near-cli to get api user authority
near view <your-account.testnet> get_api_user_authority '{"user_id":"alice.test.near"}'
```

<br />

**Tip:** If you would like to view or make calls using another account, first login into NEAR using:

```bash
# Use near-cli to login your NEAR account
near login
```

and then use the logged account to sign the transaction: `--accountId <another-account>`.
