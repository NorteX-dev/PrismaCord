import { ChannelOptions } from "../../lib/interfaces/ChannelOptions";
import { Guild } from "./Guild";
import { ChannelOverwrite } from "./ChannelOverwrite";
import { Message } from "./Message";
import { User } from "./User";
import { ThreadMetadata } from "./ThreadMetadata";
import { ThreadMember } from "./ThreadMember";
import { PrismaClient } from "./PrismaClient";
import { SendOption } from "../../lib/interfaces/SendOption";

/**
 * The Class for any Discord Channel.
 */
export class Channel {
  client: PrismaClient;
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
  parentId?: string;
  lastPinTimestamp?: string;
  rtcRegion?: string;
  videoQualityMode?: number;
  threadMessageCount?: number;
  threadMemberCount?: number;
  threadMetadata?: ThreadMetadata;
  threadMember?: ThreadMember;

  constructor(options: ChannelOptions, client: PrismaClient) {
    /**
     * The Client.
     * @type {PrismaClient}
     */
    this.client = client;

    /**
     * The ID of the Channel.
     * @type {string}
     */
    this.id = options.id;

    /**
     * The Type of the Channel.
     * @type {number}
     */
    this.type = options.type;

    /**
     * The Guild to which the Channel belongs to.
     * @type {Guild | null}
     */
    this.guild = options.guild;

    /**
     * The Position of the Channel.
     * @type {number | null}
     */
    this.position = options.position;

    /**
     * [TBD]
     * @type {Array<ChannelOverwrite> | null}
     */
    this.permissionOverwrites = options.permissionOverwrites;

    /**
     * The name of a Channel.
     * @type {string | null}
     */
    this.name = options.name;

    /**
     * The topic of a Channel.
     * @type {string | null}
     */
    this.topic = options.topic;

    /**
     * If the Channel is considered NSFW.
     * @type {boolean | null}
     */
    this.nsfw = options.nsfw;

    /**
     * The last Message in a Channel.
     * @type {Message | null}
     */
    this.lastMessage = options.lastMessage;

    /**
     * The Bitrate of a Voice Channel.
     * @type {number | null}
     */
    this.bitrate = options.bitrate;

    /**
     * The maximum amount of users allowed in a Voice Channel.
     * @type {number | null}
     */
    this.userLimit = options.userLimit;

    /**
     * The ratelimit at which a user can send messages in a Channel.
     * @type {number | null}
     */
    this.cooldown = options.cooldown;

    /**
     * [TBD]
     * @type {Array<User> | null}
     */
    this.recipient = options.recipient;

    /**
     * The ID of the Parent Channel.
     * @type {string | null}
     */
    this.parentId = options.parentId;

    /**
     * The Timestamp of the last pin in a Channel.
     * @type {string | null}
     */
    this.lastPinTimestamp = options.lastPinTimestamp;

    /**
     * The RTC Region of a Voice Channel.
     * @type {string | null}
     */
    this.rtcRegion = options.rtcRegion;

    /**
     * The Video Quality Mode of a Voice Channel.
     * @type {number | null}
     */
    this.videoQualityMode = options.videoQualityMode;

    /**
     * [TBD]
     * @type {number | null}
     */
    this.threadMessageCount = options.threadMessageCount;

    /**
     * [TBD]
     * @type {number | null}
     */
    this.threadMemberCount = options.threadMemberCount;

    /**
     * [TBD]
     * @type {ThreadMember | null}
     */
    this.threadMetadata = options.threadMetadata;

    /**
     * [TBD]
     * @type {ThreadMember | null}
     */
    this.threadMember = options.threadMember;
  }
  /**
   * Returns the Channel Mention
   */
  public get mention() {
    return `<#${this.id}>`
  }
  /**
   * Sets a new name for a Channel.
   * @param {string} name
   */
  public setName(name: string) {
    if (!(name.length >= 2 && name.length <= 100))
      throw Error("Channel name is not between 2-100 characters");
    this.client.api.patch(`/channels/${this.id}`, {
      name,
    });
    this.name = name;
    return this;
  }

  /**
   * Sets whether a Channel should be flagged as NSFW.
   * @param {boolean} nsfw
   */
  public setNSFW(nsfw: boolean) {
    if (this.type != 0) throw new TypeError("Channel does not support NSFW");
    this.client.api.patch(`/channels/${this.id}`, {
      nsfw,
    });
    this.nsfw = nsfw;
    return this;
  }

  /**
   * Sets the topic for a Channel.
   * @param {string} topic
   */
  public setTopic(topic: string) {
    if (this.type != 0) throw new TypeError("Channel does not support topics");
    this.client.api.patch(`/channels/${this.id}`, {
      topic,
    });
    this.topic = topic;
    return this;
  }

  /**
   * Sets the Position of a Channel.
   * @param {number} position
   */
  public setPosition(position: number) {
    this.client.api.patch(`/channels/${this.id}`, {
      position,
    });
    this.position = position;
    return this;
  }

  /**
   * Sets the cooldown for a Channel.
   * @param {number} rate_limit_per_user
   */
  public setCooldown(rate_limit_per_user: number) {
    if (this.type != 0)
      throw new TypeError("Channel does not support cooldowns");
    this.client.api.patch(`/channels/${this.id}`, {
      rate_limit_per_user,
    });
    this.cooldown = rate_limit_per_user;
    return this;
  }

  /**
   * Sets the bitrate for a Voice Channel.
   * @param {number} bitrate
   */
  public setBitrate(bitrate: number) {
    if (this.type != 2) throw TypeError("Channel is not a voice channel");
    if (bitrate < 8000 || bitrate > 128000)
      throw TypeError(
        `Bitrate Value "${bitrate}" is below 8000 or above 128000`
      );
    this.client.api.patch(`/channels/${this.id}`, {
      bitrate,
    });
    this.bitrate = bitrate;
    return this;
  }

  /**
   * Sets the Maximum User Limit for a Voice Channel.
   * @param {number} user_limit
   */
  public setUserLimit(user_limit: number) {
    if (this.type != 2) throw TypeError("Channel is not a voice channel");
    if (user_limit > 99) throw TypeError("User limit is larger than 99");
    this.client.api.patch(`/channels/${this.id}`, {
      user_limit,
    });
    this.userLimit = user_limit;
    return this;
  }

  /**
   * Sets parent category for channel.
   * @param {string} id
   */
  public setCategory(id: string) {
    this.client.api.patch(`/channels/${this.id}`, {
      parent_id: id,
    });
    this.parentId = id;
    return this;
  }

  /**
   * Sends a Message to a Channel.
   * @param {SendOption} content
   * @param {Embed} embed
   */
  public send(value?: SendOption) {
    if (typeof value !== 'object') throw new TypeError(`send(): Content paramater only accepts Objects. Expected objects but received ${typeof value}`)

    if (!value.content && !value.embeds?.length && !value.attachments?.length) throw new TypeError(`send(): Either 'content' or 'embeds' or 'attachments' property is required.`)

    this.client.api.post(`/channels/${this.id}/messages`,
      value
    );

    return this;
  }

  /**
   * Triggers the typing indicator in a Channel.
   */
  public triggerTyping() {
    this.client.api.post(`/channels/${this.id}/typing`, {});
    return this;
  }

  /**
   * Deletes a Channel.
   */
  public delete() {
    this.client.api.delete(`/channels/${this.id}`);
  }
}
