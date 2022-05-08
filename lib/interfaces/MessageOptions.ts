import { GuildUser } from "../../src/structures/GuildUser";
import { User } from "../../src/structures/User";
import { Role } from "../../src/structures/Role";
import { Embed } from "../../src/structures/Embed";
import { Attachment } from "../../src/structures/Attachment";
import { Message } from "../../src/structures/Message";
import { Channel } from "../../src/structures/Channel";
import { Guild } from "../../src/structures/Guild";
import { Reaction } from "../../src/structures/Reaction";
import { Sticker } from "../../src/structures/Sticker";

/**
 * Interface for MessageOptions.
 */
export interface MessageOptions {
  id: string;
  type: number;
  tts: boolean;
  timestamp: string;
  referencedMessage?: Message;
  pinned: boolean;
  nonce: string;
  mentions?: Array<GuildUser>;
  mentionRoles?: Array<Role>;
  mentionChannels?: Array<Channel>;
  flags: number;
  embeds?: Array<Embed>;
  editedTimestamp?: string;
  content: string;
  channel: Channel;
  author: GuildUser | User;
  attachments?: Array<Attachment>;
  reactions?: Array<Reaction>;
  stickers?: Array<Sticker>;
  guild?: Guild;
}
