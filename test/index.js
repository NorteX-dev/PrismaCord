require("dotenv").config();
const { PrismaClient } = require("../dist");
const client = new PrismaClient({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on("ready", () => {
  console.log("Ready in client!");
});

client.connect(process.env.TEST_TOKEN).catch((e) => {
  console.error("eeee");
});
