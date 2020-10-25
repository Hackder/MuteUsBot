import { Message } from "discord.js";
import { color } from "../config";
import { Command } from "../models/command";
import { MuteUsWatcher } from "../modules/MuteUsWatcher";

export class MuteUs implements Command {
  command = "muteus";
  description =
    "Watches the mute state of specified user and reflects it on everyone in the same voice channel, run the same command to disable it.";
  format = "muteus [@user]";

  activeWatchers: MuteUsWatcher[] = [];

  execute = (message: Message, args: string[]) => {
    if (args.length != 1 || message.mentions.users.keyArray().length != 1) {
      console.log("Wrong agruments");
      return;
    }

    const user = message.mentions.users.first();
    if (!user) {
      console.log("mention error");
      return;
    }

    const channel = message.guild?.member(user!)?.voice.channel;
    if (!channel) {
      console.log("User Must be in a voice chanel");
      return;
    }

    for (let i = 0; i < this.activeWatchers.length; i++) {
      const watcher = this.activeWatchers[i];

      if (watcher.target.id === user!.id) {
        watcher.dispose();
        this.activeWatchers.splice(i, 1);
        return;
      }
    }

    console.log(channel);
    this.activeWatchers.push(new MuteUsWatcher(channel, user!));
  };
}
