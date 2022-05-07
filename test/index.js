require("dotenv").config();
const { PrismaClient } = require("../dist");
const client = new PrismaClient({ intents: 513 });

client.on("ready", async () => {
  console.log("Ready in client!");
});

client.on("message_create", (msg) => {
  console.log(msg);
});

client.on("debug", (debug) => {
  console.log(debug);
});

client.connect(process.env.TEST_TOKEN).catch(() => {
  console.error("eeee");
});
