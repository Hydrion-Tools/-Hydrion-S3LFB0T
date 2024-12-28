const { Client, Collection } = require("discord.js-selfbot-v13");
const fs = require("fs");
const path = require("path");
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const client = new Client();
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.name, command);
}

let afkReason = '';
let afkStatus = false;
let afkStartTime = null;
let spamInterval = null;
let raidActive = false;
let raidInterval = null;
let raidsEnabled = false;
const enableRaidsMessage = `💥 Enable raids by using ${config.prefix}enableraids`;
const disableRaidsMessage = `💥 Disable raids by using ${config.prefix}disableraids`;

client.once("ready", () => {
  console.log(`Selfbot started and logged into ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.id !== client.user.id) {
    if (afkStatus && message.mentions.has(client.user)) {
      message.reply(`💤 I'm currently AFK. Reason: ${afkReason}`);
    }
    return;
  }

  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
  }
});

client.login(config.token);

module.exports = { 
  client, 
  afkReason, 
  afkStatus, 
  afkStartTime, 
  spamInterval, 
  raidActive, 
  raidInterval, 
  raidsEnabled, 
  enableRaidsMessage, 
  disableRaidsMessage, 
  prefix: config.prefix 
};
