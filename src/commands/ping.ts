import { Message } from "discord.js";
import { Command } from "../models/command";

export class Ping implements Command {
  command = "ping";
  description = "If bot replies pong, it can read your messages.";
  format = "ping";
  execute = (message: Message, args: string[]) => {
    message.channel.send("Pong!");
  };
}
