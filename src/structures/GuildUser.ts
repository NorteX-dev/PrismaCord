import { User } from "./User";
import { Role } from "./Role";
import { Guild } from "./Guild";
import { PrismaClient } from "./PrismaClient";
import { GuildUserOptions } from "../../lib/interfaces/GuildUserOptions";
import { GuildUserBanOptions } from "../../lib/interfaces/GuildUserBanOptions";
import { APIError } from "../errors/APIError";

export class GuildUser extends User {
  client: PrismaClient;
  nickname: string;
  roles: Array<Role>;
  joinedAt: string;
  boostingSince: string;
  deaf: boolean;
  mute: boolean;
  communication_disabled_until: string;
  pending?: boolean;
  permissions?: string;
  guild: Guild;

  constructor(options: GuildUserOptions, client: PrismaClient) {
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
    this.communication_disabled_until = options.communication_disabled_until;
    this.guild = options.guild;
  }

  public get userJoinedAt(): number {
    const binary = parseInt(this.id).toString(2);

    return parseInt(binary.slice(0, binary.length - 22),2) + 1420070400000;
  }

  public get userCreatedTimestamp(): Date {
    return new Date(this.joinedAt)
  }

  /**
   * Set the nickname of the guild user
   *
   * @param nickname The nickname to set
   * @returns {Promise<boolean | APIError>} Returns a promise that resolves to true if the nickname was set, otherwise an APIError
   **/
  public setNickname(nickname: string) {
    return new Promise((res, rej) => {
      this.client.api
        .patch(`/guilds/${this.guild.id}/members/${this.id}`, {
          nick: nickname,
        })
        .then((r) => {
          this.nickname = r.nick;
          res(true);
        })
        .catch((e) => rej(new APIError(e.message)));
    });
  }

  /**
   * Set the nickname of the guild user
   *
   * @param {GuildUserBanOptions} options Options for the ban: {@link GuildUserBanOptions}
   * @returns {Promise<boolean | APIError>} Returns a promise that resolves to true if the ban is created, otherwise an APIError
   **/
  public ban(options: GuildUserBanOptions = {}) {
    return new Promise<boolean | APIError>((res, rej) => {
      this.client.api
        .put(`/guilds/${this.guild.id}/bans/${this.id}`, {
          delete_message_days: options.deleteMessageDays ?? 0,
          reason: options.reason ?? "",
        })
        .then(() => {
          res(true);
        })
        .catch((e) => rej(new APIError(e.message)));
    });
  }

  public unban() {
    return new Promise<boolean | APIError>((res, rej) => {
      this.client.api
        .delete(`/guilds/${this.guild.id}/bans/${this.id}`)
        .then(() => {
          res(true);
        })
        .catch((e) => rej(new APIError(e.message)));
    });
  }

  public kick() {
    return new Promise<boolean | APIError>((res, rej) => {
      this.client.api
        .delete(`/guilds/${this.guild.id}/members/${this.id}`)
        .then(() => {
          res(true);
        })
        .catch((e) => rej(new APIError(e.message)));
    });
  }

  public timeout(timeout, reason) {
    return new Promise<boolean | APIError>((res, rej) => {
      this.client.api
        .patch(
          `/guilds/${this.guild.id}/members/${this.id}`,
          {
            communication_disabled_until: timeout && Date.now() + timeout,
          },
          reason
        )
        .then(() => {
          this.communication_disabled_until = timeout && Date.now() + timeout;
          res(true);
        })
        .catch((e) => rej(new APIError(e.message)));
    });
  }

  public cancelTimeout() {
    return new Promise<boolean | APIError>((res, rej) => {
      this.client.api
        .patch(`/guilds/${this.guild.id}/members/${this.id}`, {
          communication_disabled_until: null,
        })
        .then(() => {
          this.communication_disabled_until = null;
          res(true);
        })
        .catch((e) => rej(new APIError(e.message)));
    });
  }
}
