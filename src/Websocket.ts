import * as WebSocket from "ws";
import { PrismaClient } from "./structures/PrismaClient";
import { IntentsBitflagsResolver } from "./resolvers/IntentsBitflagsResolver";
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
            this.client.emit(
              event.t.toLowerCase() /*todo: replace with enum*/,
              event.d
            );
          }
        } else if (event.op === Opcodes.INVALID_SESSION) {
          this.client.emit("debug", "Session invalidated; reconnecting.");
          setTimeout(() => {
            this.connect(token);
          }, (Math.random() * 4 + 1) * 1000);
          // TODO : Change to identifyResume
        } else if (event.op === Opcodes.HEARTBEAT_ACK) {
          // Heartbeat ACK
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
            ? IntentsBitflagsResolver.resolve(this.client.intents)
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
}
