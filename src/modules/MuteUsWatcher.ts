import { User, VoiceChannel, VoiceState } from "discord.js";

export class MuteUsWatcher {
  constructor(public channel: VoiceChannel, public target: User) {
    target.client.on("voiceStateUpdate", this.voiceStateUpdated);
  }

  voiceStateUpdated = (oldState: VoiceState, newState: VoiceState): void => {
    // React only to target's mute change
    if (oldState.mute === newState.mute || this.target.id != newState.id)
      return;
    this.setAllMute(newState.mute || false);
  };

  setAllMute = (value: boolean) => {
    console.log(value);
    this.channel.members.forEach((member) => {
      // Don't mute the target
      if (member.id === this.target.id) return;
      // Don't mute bots
      if (member.user.bot) return;
      member.voice.setMute(value);
    });
  };

  dispose = (): void => {
    this.target.client.removeListener(
      "voiceStateUpdate",
      this.voiceStateUpdated
    );
  };
}
