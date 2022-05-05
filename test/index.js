const { PrismaCord } = require("../dist/index.js");
const client = new PrismaCord();

client.on("ready", () => {
  console.log("Ready!");
});

client.connect("token");
