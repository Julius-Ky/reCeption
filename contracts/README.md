# Reception Contract

The smart contract exposes five methods to enable storing and retrieving a reception interactions in the NEAR network.

```ts
@NearBindgen({})
class Reception {
  private owner: string = "admin.test.near";
  private fee: bigint = BigInt(1000000);
  private interactions: UnorderedMap<string[]> = new UnorderedMap<string[]>(
    "i"
  );

  @view({})
  get_owner(): string {
    return this.owner;
  }

  @call({})
  set_fee({ caller, new_fee }: { caller: string; new_fee: bigint }): void {
    if (caller === this.owner) {
      this.fee = new_fee;
      near.log(`Fee updated to: ${new_fee}`);
    } else {
      near.log("Only the owner can set the fee");
    }
  }

  @view({})
  get_fee(): bigint {
    return this.fee;
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
  sign_interaction({
    user_id,
    vulnerability_type,
    network,
  }: {
    user_id: string;
    vulnerability_type: string;
    network: string;
  }): void {
    const interaction = `Vulnerability: ${vulnerability_type} | Network: ${network}`;

    let interactions = this.interactions.get(user_id) || [];
    interactions.push(interaction);
    this.interactions.set(user_id, interactions);
    near.log(`Interaction signed and stored for ${user_id}`);
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
near deploy <your-account.testnet> build/release/reception.wasm
```

<br />
