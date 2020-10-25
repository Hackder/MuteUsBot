import { Message, MessageEmbed } from "discord.js";
import { color, prefix } from "../config";
import { Command } from "../models/command";

export class Help implements Command {
  command = "help";
  description = "Shows information about all commands.";
  execute = (message: Message, args: string[], allCommands: Command[]) => {
    const reply = new MessageEmbed()
      .setColor(color)
      .setTitle("Help page!")
      .setDescription("List of all possible bot commands.")
      .setTimestamp();
    allCommands.forEach((cmd) => {
      reply.addField(prefix + cmd.command, cmd.description);
    });
    message.channel.send(reply);
  };
}
