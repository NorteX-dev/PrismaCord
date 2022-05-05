import { Client } from "./Client";
import { User } from "./User";
import { ClientUserResolver } from "../resolvers/ClientUserResolver";
import { UserOptions } from "../../lib/interfaces/UserOptions";

export class ClientUser extends User {
  constructor(options: UserOptions, client: Client) {
    super(options, client);
  }

  public async updateName(username: string) {
    const user = ClientUserResolver(
      await this.client.api.patch(`/users/@me`, {
        username,
      }),
      this.client
    );
    this.username = username;
    return user;
  }

  public async updateAvatar(avatar: string) {
    return ClientUserResolver(
      await this.client.api.patch(`/users/@me`, {
        avatar,
      }),
      this.client
    );
  }
}
