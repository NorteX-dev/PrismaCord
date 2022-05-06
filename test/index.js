require("dotenv").config();
const { PrismaClient } = require("../dist");
const client = new PrismaClient({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on("ready", () => {
  console.log("Ready in client!");
});

client.on("guild_create", (guild) => {
  console.log(guild);
});

client.connect(process.env.TEST_TOKEN).catch(() => {
  console.error("eeee");
});
