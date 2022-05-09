import * as WebSocket from "ws";
import { PrismaClient } from "../structures/PrismaClient";
import { IntentsBitflagsResolver } from "../resolvers/IntentsBitflagsResolver";

export class Websocket {
  client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  eventNames: {
    READY: "ready";
    // TODO : map more events to names
  };

  async connect(token: string) {
    return new Promise(async (resolve) => {
      const ws = new WebSocket(
        "wss://gateway.discord.gg/gateway/bot?v=9&encoding=json"
      );

      ws.on("message", (rawData) => {
        const data = rawData.toString();
        const event = JSON.parse(data);
        // console.log("Raw message:", JSON.stringify(event));
        if (event.op == 0) {
          this.client.emit(
            "debug",
            `Received raw event: ${event.t.toLowerCase()}`
          );
          this.client.emit(event.t.toLowerCase(), event.d);
          ws.send(JSON.stringify(event.d));
        } else if (event.op === 1) {
          // Heartbeat acknowledge
          ws.send(JSON.stringify({ op: 1, d: null }));
          // } else if (event.op === 9 || event.op === 7) {
          //   Invalid Session
          //   throw new Error("The session has been invalidated.");
          // this.client.emit("debug", "Reconnecting bot.");
          // this.connect(token);
        } else if (event.op == 10) {
          ws.send(
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
          resolve(true);
          console.log(event.d.heartbeat_interval);
          setInterval(
            () => ws.send(JSON.stringify({ op: 1, d: null })),
            parseInt(event.d.heartbeat_interval)
          );
        }
      });
    });
  }
}
