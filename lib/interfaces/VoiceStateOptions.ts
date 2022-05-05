import { Guild } from "../../src/structures/Guild";
import { Channel } from "../../src/structures/Channel";
import { GuildUser } from "../../src/structures/GuildUser";

/**
 * Interface for VoiceStateOptions.
 */
export interface VoiceStateOptions {
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
}
