import { loadConfig, token, prefix, color } from "./config";
import { Client, MessageEmbed } from "discord.js";
import { Command } from "./models/command";
import { Ping } from "./commands/ping";
import { Help } from "./commands/help";

loadConfig();

const client = new Client();

const commands: Command[] = [new Help(), new Ping()];

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

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
