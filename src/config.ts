export let token: string;
export let prefix: string;
export let color: string;

export function loadConfig(): void {
  token = process.env.MUTEUSBOT_TOKEN || "";
  prefix = process.env.MUTEUSBOT_PREFIX || "!";
  color = process.env.MUTEUSBOT_COLOR || "#FC6703";
}
