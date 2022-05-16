import * as WebSocket from "ws";
import { PrismaClient } from "./structures/PrismaClient";
import { IntentsBitflagsResolver } from "./resolvers/IntentsBitflagsResolver";
import { EventEmitter } from "events";

export class Websocket extends EventEmitter {
  client: PrismaClient;
  private ws: WebSocket;

  constructor(client: PrismaClient) {
    super();
    this.client = client;
  }

  async connect(token: string) {
    return new Promise<void>(async (resolve) => {
      this.ws = new WebSocket(
        "wss://gateway.discord.gg/gateway/bot?v=9&encoding=json"
      );

      this.ws.on("message", (rawData) => {
        const data = rawData.toString();
        const event = JSON.parse(data);
        this.client.emit(
          "debug",
          `Received event: [Type] ${event.t || "N/A"} [Opcode] ${
            event.op || "N/A"
          }`
        );
        console.log(JSON.stringify(event.d).slice(0, 100));
        if (event.op === 0) {
          this.ws.send(JSON.stringify(event.d));
        } else if (event.op === 1) {
          console.log("received heartbeat");
        } else if (event.op === 9) {
          this.client.emit("debug", "Session invalidated; reconnecting.");
          this.connect(token);
          // TODO : Change to identifyResume
        } else if (event.op === 10) {
          // Hello
          resolve();
          this.client.emit(
            "debug",
            `Starting heartbeating: heartbeat interval: ${event.d.heartbeat_interval}ms`
          );
          // First acknowledgement
          setTimeout(() => {
            console.log("sending heartbeat acknowledgement");
            this.client.emit("debug", `Acknowledging first heartbeat.`);
            this.sendHeartbeat(true);
            setInterval(() => {
              this.sendHeartbeat();
            }, event.d.heartbeat_interval);
          }, event.d.heartbeat_interval * Math.random());
          this.identifyNew(token);
        } else if (event.op === 11) {
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

  async sendHeartbeat(noDebug: boolean = false) {
    return new Promise<void>((resolve) => {
      if (!noDebug) this.client.emit("debug", `Sending heartbeat.`);
      this.ws.send(JSON.stringify({ op: 1, d: null }));
      resolve();
    });
  }
}
