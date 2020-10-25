import { User, VoiceChannel, VoiceState } from "discord.js";

export class MuteUsWatcher {
  constructor(public channel: VoiceChannel, public target: User) {
    target.client.on("voiceStateUpdate", this.voiceStateUpdated);
  }

  voiceStateUpdated = (_: VoiceState, newState: VoiceState): void => {
    this.setAllMute(newState.mute || false);
  };

  setAllMute = (value: boolean) => {
    this.channel.members.forEach((member) => {
      if (member.id === this.target.id) return;
      member.voice.setMute(value);
    });
  };

  dispose = (): void => {
    this.target.client.removeAllListeners();
  };
}
