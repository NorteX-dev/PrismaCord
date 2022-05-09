import { PrismaClient } from "./PrismaClient";
import { GuildUser } from "./GuildUser";
import { User } from "./User";
import { Role } from "./Role";
import { Embed } from "./Embed";
import { Attachment } from "./Attachment";
import { Channel } from "./Channel";
import { Guild } from "./Guild";
import { MessageOptions } from "../../lib/interfaces/MessageOptions";

export class Message {
  client!: PrismaClient;
  readonly type: number;
  readonly tts: boolean;
  readonly timestamp: string;
  readonly repliedTo?: Message;
  readonly isPinned: boolean;
  readonly nonce: string;
  readonly mentions: Array<GuildUser>;
  readonly mentionRoles: Array<Role>;
  readonly id: string;
  readonly flags: number;
  readonly embeds?: Array<Embed>;
  readonly editedTimestamp?: string;
  readonly content: string;
  readonly channel: Channel;
  readonly author: GuildUser | User;
  readonly attachments: Array<Attachment>;
  readonly epheremal: boolean;
  readonly guild?: Guild;

  constructor(options: MessageOptions, client: PrismaClient) {
    this.client = client;
    this.id = options.id;
    this.type = options.type;
    this.tts = options.tts;
    this.timestamp = options.timestamp;
    this.repliedTo = options.referencedMessage;
    this.isPinned = options.pinned;
    this.nonce = options.nonce;
    this.mentions = options.mentions || [];
    this.mentionRoles = options.mentionRoles || [];
    this.flags = options.flags;
    this.embeds = options.embeds || [];
    this.editedTimestamp = options.editedTimestamp;
    this.content = options.content;
    this.channel = options.channel;
    this.author = options.author;
    this.attachments = options.attachments || [];
    this.epheremal = options.ephemeral;
    this.guild = options.guild;
  }

  public get createdAt(): number {
    const binary = parseInt(this.id).toString(2);
    return parseInt(binary.slice(0, binary.length - 22), 2) + 1420070400000;
  }

  public get createdTimestamp(): Date {
    return new Date(this.createdAt);
  }

  // reply function still needs working - ChrisSch

  public reply(value?: object) {
    if (!this.guild?.id) throw Error("Not a guild message");
    if (typeof value !== 'object') throw new TypeError(`reply(): Content paramater only accepts Object. Expected String, but received Objects`)

    return new Promise(async (res, rej) => {
      this.client.api
        .post(`/channels/${this.channel.id}/messages`,
          {
            value,
            message_reference: {
              message_id: this.id,
              channel_id: this.channel.id,
              // @ts-ignore
              guild_id: this.guild.id,
              fail_if_not_exists: false,
            }
          },
        )
        .then(res)
        .catch(rej)
    })
  }
}
