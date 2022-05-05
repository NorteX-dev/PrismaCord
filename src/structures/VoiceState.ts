import { Guild } from "./Guild";
import { Channel } from "./Channel";
import { GuildUser } from "./GuildUser";

export class VoiceState {
  guild: Guild;
  channel: Channel;
  user: GuildUser;
  sessionId: string;
  deaf: boolean;
  mute: boolean;
  selfDeaf: boolean;
  selfMute: boolean;
  selfStreaming?: boolean;
  selfVideo: boolean;
  supress: boolean;
  requestToSpeakTimestamp: string;

  constructor(options: VoiceState) {
    this.guild = options.guild;
    this.channel = options.channel;
    this.user = options.user;
    this.sessionId = options.sessionId;
    this.deaf = options.deaf;
    this.mute = options.mute;
    this.selfDeaf = options.selfDeaf;
    this.selfMute = options.selfMute;
    this.selfStreaming = !!options.selfStreaming;
    this.selfVideo = options.selfVideo;
    this.supress = options.supress;
    this.requestToSpeakTimestamp = options.requestToSpeakTimestamp;
  }
}
