const { Client, Collection } = require("discord.js-selfbot-v13");
const fs = require("fs");
const path = require('path');
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

client.once("ready", () => {
  console.log(`Selfbot started and logged into ${client.user.tag}`);
});

const token = config.token;
let afkReason = '';
let afkStatus = false;
let afkStartTime = null;
let spamInterval = null;
let raidActive = false;
let raidInterval = null;
let prefix = config.prefix || "?";
let raidsEnabled = false;
const enableRaidsMessage = `💥 Enable raids by using ${prefix}enableraids`;
const disableRaidsMessage = `💥 Disable raids by using ${prefix}disableraids`;

module.exports = { prefix, afkReason, afkStatus, afkStartTime, spamInterval, raidActive, raidInterval, raidsEnabled, enableRaidsMessage, disableRaidsMessage };

client.on('messageCreate', async (message) => {
  if (message.author.id !== client.user.id) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

  try {
    await command.execute(message.args);
  } catch (error) {
    console.error(error);
  }
})

client.login(token);