import { User } from "./User";
import { Role } from "./Role";
import { Guild } from "./Guild";
import { Client } from "./Client";
import { GuildUserOptions } from "../../lib/interfaces/GuildUserOptions";
import { GuildUserBanOptions } from "../../lib/interfaces/GuildUserBanOptions";

export class GuildUser extends User {
  client: Client;
  nickname: string;
  roles: Array<Role>;
  joinedAt: string;
  boostingSince: string;
  deaf: boolean;
  mute: boolean;
  pending?: boolean;
  permissions?: string;
  guild: Guild;

  constructor(options: GuildUserOptions, client: Client) {
    super(options, client);
    this.client = client;
    this.nickname = options.nickname;
    this.roles = options.roles;
    this.joinedAt = options.joinedAt;
    this.boostingSince = options.boostingSince;
    this.deaf = options.deaf;
    this.mute = options.mute;
    this.pending = options.pending;
    this.permissions = options.permissions;
    this.guild = options.guild;
  }

  public setNick(nick: string) {
    this.client.api.patch(`/guilds/${this.guild.id}/members${this.id}`, {
      nick,
    });
    this.nickname = nick;
  }

  public ban(options: GuildUserBanOptions = {}) {
    this.client.api.put(`/guilds/${this.guild.id}/bans/${this.id}`, {
      delete_message_days: options.deleteMessageDays ?? 0,
      reason: options.reason ?? "",
    });
  }

  public unban() {
    this.client.api.delete(`/guilds/${this.guild.id}/bans/${this.id}`);
  }

  public kick() {
    this.client.api.delete(`/guilds/${this.guild.id}/members/${this.id}`);
  }
}
