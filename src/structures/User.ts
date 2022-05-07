import { AvatarUrlOptions } from "../../lib/interfaces/AvatarURLOptions";
import { UserOptions } from "../../lib/interfaces/UserOptions";
import { PrismaClient } from "./PrismaClient";

export class User {
  client: PrismaClient;
  id: string;
  username: string;
  tag: string;
  avatar: string;
  bot: boolean;
  system?: boolean;
  mfaEnabled?: boolean;
  locale?: string;
  verified?: boolean;
  flags?: number;
  premiumType?: number;
  publicFlags?: number;

  constructor(options: UserOptions, client: PrismaClient) {
    this.client = client;
    this.id = options.id;
    this.username = options.username;
    this.tag = options.tag;
    this.avatar = options.avatar;
    this.bot = options.bot;
    this.system = !!options.system;
    this.locale = options.locale;
    this.flags = options.flags;
    this.mfaEnabled = !!options.mfaEnabled;
    this.premiumType = options.premiumType;
    this.verified = !!options.verified;
    this.publicFlags = options.publicFlags;
  }

  public get fullName(): string {
    return `${this.username}#${this.tag}`;
  }

  public avatarUrl(options: AvatarUrlOptions): string {
    return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${
      options.format || "png"
    }${!!options.size ? "?size=" + options.size : ""}`;
  }

  public get createdAt(): number {
    const binary = parseInt(this.id).toString(2);
    return parseInt(binary.slice(0, binary.length - 22), 2) + 1420070400000;
  }

  public get createdTimestamp(): Date {
    return new Date(this.createdAt);
  }

  public get mention() {
    return `<@!${this.id}>`;
  }

  public async openDM() {
    return await this.client.api.post("/users/@me/channels", {
      recipient_id: this.id,
    });
  }

  public async send(content: string) {
    const dmChannel: any = await this.openDM();
    return await this.client.api.post(`/channels/${dmChannel.id}/messages`, {
      content,
    });
  }
}
