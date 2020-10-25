import { Message } from "discord.js";

export interface Command {
  command: string;
  description: string;
  execute: (message: Message, args: string[], allCommands: Command[]) => void;
}
