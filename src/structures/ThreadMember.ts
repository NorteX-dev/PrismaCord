import { ThreadMemberOptions } from "../../lib/interfaces/ThreadMemberOptions";
import { Channel } from "./Channel";
import { GuildUser } from "./GuildUser";

export class ThreadMember {
  readonly channel: Channel;
  readonly user: GuildUser;
  readonly joinTimestamp: string;
  readonly flags: number;

  constructor(options: ThreadMemberOptions) {
    this.channel = options.channel;
    this.user = options.user;
    this.joinTimestamp = options.joinTimestamp;
    this.flags = options.flags;
  }
}
