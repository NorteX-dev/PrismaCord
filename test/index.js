require("dotenv").config();
const logger = require("log4js").getLogger("[default]");
logger.level = "debug";
const { PrismaClient } = require("../dist");
const client = new PrismaClient({
  intents: ["GUILDS", "GUILD_MESSAGES", "MESSAGE_CONTENT"],
});

client.on("ready", async () => {
  console.log("Ready in client!");
});

client.on("message_create", (msg) => {
  console.log(msg);
});

client.on("debug", (debug) => {
  logger.debug(debug);
});

client.connect(process.env.TEST_TOKEN).catch(() => {
  console.error("eeee");
});
