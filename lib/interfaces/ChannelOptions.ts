import { ChannelOverwrite } from "../../src/structures/ChannelOverwrite";
import { User } from "../../src/structures/User";
import { Guild } from "../../src/structures/Guild";
import { Message } from "../../src/structures/Message";
import { ThreadMetadata } from "../../src/structures/ThreadMetadata";
import { ThreadMember } from "../../src/structures/ThreadMember";

/**
 * Interface for ChannelOptions.
 */
export interface ChannelOptions {
  id: string;
  type: number;
  guild?: Guild;
  position?: number;
  permissionOverwrites?: Array<ChannelOverwrite>;
  name?: string;
  topic?: string;
  nsfw?: boolean;
  lastMessage?: Message;
  bitrate?: number;
  userLimit?: number;
  cooldown?: number;
  recipient?: Array<User>;
  icon?: string;
  parentId?: string;
  lastPinTimestamp?: string;
  rtcRegion?: string;
  videoQualityMode?: number;
  threadMessageCount?: number;
  threadMemberCount?: number;
  threadMetadata?: ThreadMetadata;
  threadMember?: ThreadMember;
}
