import { EmojiOptions } from "../../lib/interfaces/EmojiOptions";
import { User } from "./User";
import { PrismaClient } from "./PrismaClient";

export class Emoji {
  client: PrismaClient;
  id: string;
  name: string;
  user?: User;
  requireColons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;

  constructor(options: EmojiOptions, client: PrismaClient) {
    this.client = client;
    this.id = options.id;
    this.name = options.name;
    this.user =
      options.user ||
      new User(
        { id: "", username: "", tag: "", avatar: "", bot: false },
        this.client
      );
  }
}
