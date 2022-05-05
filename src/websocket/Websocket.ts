import { PrismaClient } from "../structures/PrismaClient";
import { EventOptions } from "../../lib/interfaces/EventOptions";
import * as WebSocket from "ws";

export class Websocket {
  client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  flags = {
    GUILDS: 1 << 0,
    GUILD_MEMBERS: 1 << 1,
    GUILD_BANS: 1 << 2,
    GUILD_EMOJIS_AND_STICKERS: 1 << 3,
    GUILD_INTEGRATIONS: 1 << 4,
    GUILD_WEBHOOKS: 1 << 5,
    GUILD_INVITES: 1 << 6,
    GUILD_VOICE_STATES: 1 << 7,
    GUILD_PRESENCES: 1 << 8,
    GUILD_MESSAGES: 1 << 9,
    GUILD_MESSAGE_REACTIONS: 1 << 10,
    GUILD_MESSAGE_TYPING: 1 << 11,
    DIRECT_MESSAGES: 1 << 12,
    DIRECT_MESSAGE_REACTIONS: 1 << 13,
    DIRECT_MESSAGE_TYPING: 1 << 14,
    GUILD_SCHEDULED_EVENTS: 1 << 16,
  };

  calculateIntentBits(flags: string[]) {
    let intentBits = 0;
    for (const flag of flags) {
      intentBits |= this.flags[flag];
    }
    return intentBits;
  }

  eventNames: {
    READY: "ready";
    // TODO : map more events to names
  };

  async connect(token: string) {
    return new Promise(async (resolve, reject) => {
      const ws = new WebSocket(
        "wss://gateway.discord.gg/gateway/bot?v=9&encoding=json"
      );

      ws.on("message", (rawData) => {
        const data = rawData.toString();
        const message = JSON.parse(data);
        if (message.op == 0) {
          console.log("Emitting", message.t.toLowerCase());
          this.client.emit(message.t.toLowerCase(), message.d);
          ws.send(JSON.stringify(message.d));
        } else if (message.op == 1) {
          ws.send(JSON.stringify({ op: 1, d: null }));
        } else if (message.op == 9) {
          console.error(
            `The session has been invalidated\nDetails : ${message}`
          );
          reject(new Error("Session invalidated"));
        } else if (message.op == 10) {
          ws.send(
            JSON.stringify({
              op: 2,
              d: {
                token: token,
                intents: this.calculateIntentBits(this.client.intents),
                large_threshold: 250,
                properties: {
                  $os: "linux",
                  $browser: "prismacord",
                  $device: "prismacord",
                },
              },
            })
          );
          resolve(true);
          setInterval(
            () => ws.send(JSON.stringify({ op: 1, d: null })),
            parseInt(message.d.heartbeat_interval)
          );
        }
      });
    });
  }
}
