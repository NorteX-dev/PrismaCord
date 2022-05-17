import * as WebSocket from "ws";
import { PrismaClient } from "./structures/PrismaClient";
import { IntentsResolver } from "./resolvers/IntentsResolver";
import { EventEmitter } from "events";

enum Opcodes {
  DISPATCH = 0,
  HEARTBEAT = 1,
  IDENTIFY = 2,
  PRESENCE_UPDATE = 3,
  VOICE_STATE_UPDATE = 4,
  RESUME = 6,
  RECONNECT = 7,
  REQUEST_GUILD_MEMBERS = 8,
  INVALID_SESSION = 9,
  HELLO = 10,
  HEARTBEAT_ACK = 11,
}

export class Websocket extends EventEmitter {
  client: PrismaClient;
  private ws: WebSocket;
  private heartbeatInterval = null;
  private lastSeq?: number = null;

  constructor(client: PrismaClient) {
    super();
    this.client = client;
  }

  async connect(token: string) {
    return new Promise<void>(async (resolve) => {
      this.ws = new WebSocket(
        "wss://gateway.discord.gg/gateway/bot?v=9&encoding=json"
      );

      this.ws.on("message", async (rawData) => {
        const data = rawData.toString();
        const event = JSON.parse(data);

        if (event.s !== undefined) {
          this.lastSeq = event.s;
        }

        this.client.emit(
          "debug",
          `Received event: ${event.op || "Opcode N/A"} | ${
            event.t || "Type N/A"
          }`
        );
        if (event.op === Opcodes.HELLO) {
          resolve();
          this.client.emit(
            "debug",
            `Starting heartbeating: heartbeat interval: ${event.d.heartbeat_interval}ms`
          );
          this.heartbeatInterval = event.d.heartbeat_interval;
          await this.beginHeartbeating();
          await this.identifyNew(token);
        } else if (event.op === Opcodes.DISPATCH) {
          if (event.t === "READY") {
            this.client.readyAt = new Date();
            this.client.ready = true;
            this.client.emit("ready");
          } else {
            this.client.emit("debug", "Dispatching event " + event.t);
            this.dispatchEvent(event.t, event.d);
          }
        } else if (event.op === Opcodes.INVALID_SESSION) {
          this.client.emit("debug", "Session invalidated; reconnecting.");
          setTimeout(() => {
            this.connect(token);
          }, (Math.random() * 4 + 1) * 1000);
          // TODO : Change to identifyResume
        } else if (event.op === Opcodes.HEARTBEAT_ACK) {
          this.client.emit("debug", `Heartbeat acknowledge ACKed.`);
        }
      });
    });
  }

  async identifyNew(token: string) {
    this.client.emit("debug", `Sending identify request`);
    this.ws.send(
      JSON.stringify({
        op: 2,
        d: {
          token: token,
          intents: Array.isArray(this.client.intents)
            ? IntentsResolver.resolve(this.client.intents)
            : this.client.intents,
          large_threshold: 250,
          properties: {
            $os: "linux",
            $browser: "prismacord",
            $device: "prismacord",
          },
        },
      })
    );
  }

  async beginHeartbeating() {
    setTimeout(() => {
      this.client.emit("debug", `Acknowledging first heartbeat.`);
      this.sendHeartbeat(true);
      setInterval(() => {
        this.client.emit("debug", `Acknowledging next heartbeat.`);
        this.sendHeartbeat();
      }, this.heartbeatInterval);
    }, this.heartbeatInterval * Math.random());
  }

  async sendHeartbeat(noDebug: boolean = false) {
    return new Promise<void>((resolve) => {
      if (!noDebug) this.client.emit("debug", `Sending heartbeat.`);
      const payload = JSON.stringify({ op: 1, d: this.lastSeq });
      this.ws.send(payload);
      resolve();
    });
  }

  // Add resolvers to various events, like Message() resolver to messageCreate, Channel() resolver to channelCreate, etc.
  async dispatchEvent(type: string, data: any) {
    switch (type) {
      case "READY":
        this.client.emit("ready", data);
        break;
      case "APPLICATION_COMMAND_PERMISSIONS_UPDATE":
        this.client.emit("applicationCommandPermissionsUpdate", data);
        break;
      case "CHANNEL_CREATE":
        this.client.emit("channelCreate", data);
        break;
      case "CHANNEL_UPDATE":
        this.client.emit("channelUpdate", data);
        break;
      case "CHANNEL_DELETE":
        this.client.emit("channelDelete", data);
        break;
      case "THREAD_CREATE":
        this.client.emit("threadCreate", data);
        break;
      case "THREAD_UPDATE":
        this.client.emit("threadUpdate", data);
        break;
      case "THREAD_DELETE":
        this.client.emit("threadDelete", data);
        break;
      case "THREAD_MEMBER_UPDATE":
        this.client.emit("threadMemberUpdate", data);
        break;
      case "THREAD_MEMBERS_UPDATE":
        this.client.emit("threadMembersUpdate", data);
        break;
      case "GUILD_CREATE":
        this.client.emit("guildCreate", data);
        break;
      case "GUILD_UPDATE":
        this.client.emit("guildUpdate", data);
        break;
      case "GUILD_DELETE":
        this.client.emit("guildDelete", data);
        break;
      case "GUILD_BAN_ADD":
        this.client.emit("guildBanAdd", data);
        break;
      case "GUILD_BAN_REMOVE":
        this.client.emit("guildBanRemove", data);
        break;
      case "GUILD_EMOJIS_UPDATE":
        this.client.emit("guildEmojisUpdate", data);
        break;
      case "GUILD_STICKERS_UPDATE":
        this.client.emit("guildStickersUpdate", data);
        break;
      case "GUILD_INTEGRATIONS_UPDATE":
        this.client.emit("guildIntegrationsUpdate", data);
        break;
      case "GUILD_MEMBER_UPDATE":
        this.client.emit("guildMemberUpdate", data);
        break;
      case "GUILD_ROLE_CREATE":
        this.client.emit("roleCreate", data);
        break;
      case "GUILD_ROLE_UPDATE":
        this.client.emit("roleUpdate", data);
        break;
      case "GUILD_ROLE_DELETE":
        this.client.emit("roleDelete", data);
        break;
      case "GUILD_SCHEDULED_EVENT_CREATE":
        this.client.emit("guildScheduledEventCreate", data);
        break;
      case "GUILD_SCHEDULED_EVENT_UPDATE":
        this.client.emit("guildScheduledEventUpdate", data);
        break;
      case "GUILD_SCHEDULED_EVENT_DELETE":
        this.client.emit("guildScheduledEventDelete", data);
        break;
      case "GUILD_SCHEDULED_EVENT_USER_ADD":
        this.client.emit("guildScheduledEventUserAdd", data);
        break;
      case "GUILD_SCHEDULED_EVENT_USER_REMOVE":
        this.client.emit("guildScheduledEventUserRemove", data);
        break;
      case "INTEGRATION_CREATE":
        this.client.emit("integrationCreate", data);
        break;
      case "INTEGRATION_UPDATE":
        this.client.emit("integrationUpdate", data);
        break;
      case "INTEGRATION_DELETE":
        this.client.emit("integrationDelete", data);
        break;
      case "INTERACTION_CREATE":
        this.client.emit("interactionCreate", data);
        break;
      case "INVITE_CREATE":
        this.client.emit("inviteCreate", data);
        break;
      case "INVITE_DELETE":
        this.client.emit("inviteDelete", data);
        break;
      case "MESSAGE_CREATE":
        this.client.emit("messageCreate", data);
        break;
      case "MESSAGE_UPDATE":
        this.client.emit("messageUpdate", data);
        break;
      case "MESSAGE_DELETE":
        this.client.emit("messageDelete", data);
        break;
      case "MESSAGE_DELETE_BULK":
        this.client.emit("messageDeleteBulk", data);
        break;
      case "MESSAGE_REACTION_ADD":
        this.client.emit("messageReactionAdd", data);
        break;
      case "MESSAGE_REACTION_REMOVE":
        this.client.emit("messageReactionRemove", data);
        break;
      case "MESSAGE_REACTION_REMOVE_ALL":
        this.client.emit("messageReactionRemoveAll", data);
        break;
      case "MESSAGE_REACTION_REMOVE_EMOJI":
        this.client.emit("messageReactionRemoveEmoji", data);
        break;
      case "PRESENCE_UPDATE":
        this.client.emit("presenceUpdate", data);
        break;
      case "STAGE_INSTANCE_CREATE":
        this.client.emit("stageCreate", data);
        break;
      case "STAGE_INSTANCE_UPDATE":
        this.client.emit("stageUpdate", data);
        break;
      case "STAGE_INSTANCE_DELETE":
        this.client.emit("stageDelete", data);
        break;
      case "TYPING_START":
        this.client.emit("typingStart", data);
        break;
      case "USER_UPDATE":
        this.client.emit("userUpdate", data);
        break;
      case "VOICE_STATE_UPDATE":
        this.client.emit("voiceStateUpdate", data);
        break;
      case "VOICE_SERVER_UPDATE":
        this.client.emit("voiceServerUpdate", data);
        break;
      case "WEBHOOKS_UPDATE":
        this.client.emit("webhooksUpdate", data);
        break;
    }
  }
}
