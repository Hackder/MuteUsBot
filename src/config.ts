import { MessageEmbed } from "discord.js";

export let token: string;
export let prefix: string;
export let color: string;
export let allowedRole: string = "768590549824307270";
export let allowedChannels: string[] = ["769960018833047643"];

export function loadConfig(): void {
  token = process.env.MUTEUSBOT_TOKEN || "";
  prefix = process.env.MUTEUSBOT_PREFIX || "-";
  color = process.env.MUTEUSBOT_COLOR || "#FC6703";
}

export function errorMessage(message: string): MessageEmbed {
  return new MessageEmbed()
    .setColor(color)
    .setTitle("Error")
    .setDescription(message)
    .setTimestamp();
}

export function infoMessage(title: string, message?: string) {
  return new MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(message || "")
    .setTimestamp();
}
