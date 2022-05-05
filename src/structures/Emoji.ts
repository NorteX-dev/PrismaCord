import { EmojiOptions } from "../../lib/interfaces/EmojiOptions";
import { Role } from "./Role";
import { User } from "./User";
import { Client } from "./Client";

export class Emoji {
  client: Client;
  id: string;
  name: string;
  roles?: Array<Role>;
  user?: User;
  requireColons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;

  constructor(options: EmojiOptions, client: Client) {
    this.client = client;
    this.id = options.id;
    this.name = options.name;
    this.roles = options.roles || [];
    this.user =
      options.user ||
      new User(
        { id: "", username: "", tag: "", avatar: "", bot: false },
        this.client
      );
  }
}
