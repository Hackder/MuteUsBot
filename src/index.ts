import {
  loadConfig,
  token,
  prefix,
  allowedChannels,
  allowedRole,
} from "./config";
import { Client, Role } from "discord.js";
import { Command } from "./models/command";
import { Ping } from "./commands/ping";
import { Help } from "./commands/help";
import { MuteUs } from "./commands/muteus";

loadConfig();

const client = new Client();

const commands: Command[] = [new Help(), new Ping(), new MuteUs()];

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  console.log(message.channel.id);
  // Check if the message is in allowed channel
  if (!allowedChannels.includes(message.channel.id)) return;
  // Check if the user has allowed role
  if (
    !message.member?.roles.cache.some((role: Role) => role.id === allowedRole)
  )
    return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift()?.toLocaleLowerCase();

  if (!command) return;

  commands.forEach((cmd) => {
    if (cmd.command === command) {
      cmd.execute(message, args, commands);
    }
  });
});

client.on("ready", () => {
  console.log("Ready!");
});

client.login(token);
