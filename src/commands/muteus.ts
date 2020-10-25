import { info } from "console";
import { Message } from "discord.js";
import { color, errorMessage, infoMessage, prefix } from "../config";
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
      message.channel.send(
        errorMessage(`Wrong arguments, for more info check \`${prefix}help\``)
      );
      return;
    }

    const user = message.mentions.users.first();
    if (!user) {
      message.channel.send(errorMessage("Mentioned user does not exist!"));
      return;
    }

    const channel = message.guild?.member(user!)?.voice.channel;
    if (!channel) {
      message.channel.send(
        errorMessage("User needs to be connected in a voice channel!")
      );
      return;
    }

    for (let i = 0; i < this.activeWatchers.length; i++) {
      const watcher = this.activeWatchers[i];

      if (watcher.target.id === user!.id) {
        watcher.dispose();
        const oldWatcher = this.activeWatchers.splice(i, 1)[0];

        message.channel.send(
          infoMessage(`Stopped watching @${oldWatcher.target.tag}!`)
        );
        return;
      }
    }

    this.activeWatchers.push(new MuteUsWatcher(channel, user!));
    message.channel.send(infoMessage(`Started watching @${user.tag}!`));
  };
}
