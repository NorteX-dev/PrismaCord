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
    return new Promise(async (resolve, reject) => {
      const ws = new WebSocket(
        "wss://gateway.discord.gg/gateway/bot?v=9&encoding=json"
      );

      ws.on("message", (rawData) => {
        const data = rawData.toString();
        const message = JSON.parse(data);
        console.log("Raw message:", JSON.stringify(message));
        if (message.op == 0) {
          this.client.emit(
            "debug",
            `Received raw event: ${message.t.toLowerCase()}`
          );
          this.client.emit(message.t.toLowerCase(), message.d);
          ws.send(JSON.stringify(message.d));
        } else if (message.op == 1) {
          ws.send(JSON.stringify({ op: 1, d: null }));
        } else if (message.op == 9) {
          throw new Error("The session has been invalidated.");
        } else if (message.op == 10) {
          ws.send(
            JSON.stringify({
              op: 2,
              d: {
                token: token,
                intents:
                  typeof this.client.intents === "number"
                    ? this.client.intents
                    : IntentsBitflagsResolver.resolve(this.client.intents),
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
