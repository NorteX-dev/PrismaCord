import { Embed } from "../../src/structures/Embed";
import { Attachment } from "../../src/structures/Attachment";
import { Message } from "../../src/structures/Message";

/**
 * Interface for MessageSendOptions.
 */
export interface MessageSendOptions {
  reply?: Message;
  pinned: boolean;
  embeds: Array<Embed>;
  channelId: string;
  attachments: Array<Attachment>;
}
