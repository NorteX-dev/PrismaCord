require("dotenv").config();
const { PrismaClient } = require("../dist");
const client = new PrismaClient({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on("ready", () => {
  console.log("Ready in client!");
});

client.on("message_create", (msg) => {
  console.log(msg);
});

client.connect(process.env.TEST_TOKEN).catch(() => {
  console.error("eeee");
});
