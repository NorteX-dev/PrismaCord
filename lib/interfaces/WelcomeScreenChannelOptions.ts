import { Channel } from "../../src/structures/Channel";

/**
 * Interface for WelcomeScreenChannelOptions.
 */
export interface WelcomeScreenChannelOptions {
  channel: Channel;
  description: string;
  emojiId: string | null;
  emojiName: string;
}
