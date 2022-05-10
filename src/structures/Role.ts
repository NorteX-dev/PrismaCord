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
  public setName(name) {
    if (this.managed === true) throw new Error(`This role is managed by an intergration!`)
    if (!name) throw new TypeError(`Missing argument "name"`)

    return new Promise(async (res, rej) => {
      this.client.api
        .patch(`/guilds/${this.guild.id}/roles/${this.id}`, {
          name
        }).then((response) => {
          this.name = name;
          res(response)
        }).catch(rej)
    })
  }
  public setColor(color) {
    if (this.managed === true) throw new Error(`This role is managed by an intergration!`)
    if (!color) throw new TypeError(`Missing argument "color"`)
    if (typeof color !== 'number') throw new TypeError(`Expected number, but received ${typeof color}`)

    return new Promise(async (res, rej) => {
      this.client.api
        .patch(`/guilds/${this.guild.id}/roles/${this.id}`, {
          color
        }).then((response) => {
          this.color = color;
          res(response)
        }).catch(rej)
    })
  }
  public setHoist(value) {
    if (this.managed === true) throw new Error(`This role is managed by an intergration!`)
    if (!value) throw new TypeError(`Missing argument "value"`)
    if (typeof value !== 'boolean') throw new TypeError(`Expected boolean, but received ${typeof value}`)

    return new Promise(async (res, rej) => {
      this.client.api
        .patch(`/guilds/${this.guild.id}/roles/${this.id}`, {
          hoist: value
        }).then((response) => {
          this.hoist = value;
          res(response);
        }).catch(rej)
    })
  }
  public setMentionable(value) {
    if (this.managed === true) throw new Error(`This role is managed by an intergration!`)
    if (!value) throw new TypeError(`Missing argument "value"`)
    if (typeof value !== 'boolean') throw new TypeError(`Expected boolean, but received ${typeof value}`)

    return new Promise(async (res, rej) => {
      this.client.api
        .patch(`/guilds/${this.guild.id}/roles/${this.id}`, {
          mentionable: value,
        }).then((response) => {
          this.mentionable = value;
          res(response)
        }).catch(rej)
    })
  }
  // WIP

  public setRoleIcon(value) {
    if (this.managed === true) throw new Error(`This role is managed by an intergration!`)
    if (!value) throw new TypeError(`Missing argument "value"`)

    return new Promise(async (res, rej) => {
      this.client.api
        .patch(`/guilds/${this.guild.id}/roles/${this.id}`, {

          // 

        }).then((response) => {
          this.icon = value;
          res(response)
        }).catch(rej)
    })
  }

  public setPosition(position) {
    if (!position) throw new TypeError(`Missing argument "position"`)

    return new Promise(async (res, rej) => {
      this.client.api
        .patch(`guilds/${this.guild.id}/roles`, {
          id: this.id,
          position
        }).then((response) => {
          this.position = position;
          res(response)
        }).catch(rej)
    })
  }

  public delete() {
    if (this.managed === true) throw new Error(`This role is managed by an intergration!`)

    return new Promise(async (res, rej) => {
      this.client.api
        .delete(`/guilds/${this.guild.id}/roles/${this.id}`, {}).then((response) => {
          res(response);
        }).catch(rej)
    })
  }
}
