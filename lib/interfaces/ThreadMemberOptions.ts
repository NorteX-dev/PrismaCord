import { Channel } from "../../src/structures/Channel";
import { GuildUser } from "../../src/structures/GuildUser";

/**
 * Interface for ThreadMemberOptions.
 */
export interface ThreadMemberOptions {
  channel: Channel;
  user: GuildUser;
  joinTimestamp: string;
  flags: number;
}
