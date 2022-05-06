import { RoleOptions } from "../../lib/interfaces/RoleOptions";
import { RoleTag } from "./RoleTag";
import { Guild } from "./Guild";
import { PrismaClient } from "./PrismaClient";

export class Role {
  guild: Guild;
  client: PrismaClient;
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  icon: string;
  tags?: RoleTag;

  constructor(options: RoleOptions, guild: Guild, client: PrismaClient) {
    this.guild = guild;
    this.client = client;
    this.id = options.id;
    this.name = options.name;
    this.color = options.color;
    this.hoist = options.hoist;
    this.position = options.position;
    this.permissions = options.permissions;
    this.managed = options.managed;
    this.mentionable = options.mentionable;
    this.icon = options.icon;
    this.tags = options.tags;
  }

  public get createdAt(): number {
    const binary = parseInt(this.id).toString(2);
    return parseInt(binary.slice(0, binary.length - 22), 2) + 1420070400000;
  }

  public get createdTimestamp(): Date {
    return new Date(this.createdAt);
  }
  public get mention() {
    return `<@$${this.id}>`;
  }
  public get getIcon() {
    return `${this.icon}`
  }
}
