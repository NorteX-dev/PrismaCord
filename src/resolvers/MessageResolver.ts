import { Message } from "../structures/Message";
import { PrismaClient } from "../structures/PrismaClient";

/**
 * Resolver for Message.
 *
 * @param {any} data Raw data
 * @param {PrismaClient} client Client instance
 */
export function MessageResolver(data: any, client: PrismaClient): Message {
  return new Message(
    {
      id: data.id,
      type: data.type,
      timestamp: data.timestamp,
      tts: data.tts,
      // mentionChannels: data.mentionChannels.map(c => ChannelResolver(c)),
      pinned: data.pinned,
      reactions: data.reactions,
      stickers: data.stickers,
      nonce: data.nonce,
      mentions: data.mentions || [],
      mentionRoles: data.mentionRoles || [],
      mentionEveryone: data.mentionEveryone,
      flags: data.flags,
      embeds: data.embeds || [],
      editedTimestamp: data.editedTimestamp,
      content: data.content,
      channel: data.channel,
      author: data.author,
      attachments: data.attachments || [],
      guild: data.guild,
    },
    client
  );
}
