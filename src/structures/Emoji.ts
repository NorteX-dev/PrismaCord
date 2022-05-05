import { EmojiOptions } from "../../lib/interfaces/EmojiOptions";
import { Role } from "./Role";
import { User } from "./User";
import { PrismaClient } from "./PrismaClient";

export class Emoji {
  client: PrismaClient;
  id: string;
  name: string;
  roles?: Array<Role>;
  user?: User;
  requireColons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;

  constructor(options: EmojiOptions, client: PrismaClient) {
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
