import {
  NearBindgen,
  initialize,
  near,
  call,
  view,
  UnorderedMap,
} from "near-sdk-js";

@NearBindgen({})
class ReCeption {
  private owner: string = "admin.test.near";
  private fee: bigint = BigInt(1000000);
  private MAX_INTERACTIONS = 1000;
  private MAX_INPUT_LENGTH = 256;
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
}
