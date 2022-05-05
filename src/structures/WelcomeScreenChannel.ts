import { WelcomeScreenChannelOptions } from "../../lib/interfaces/WelcomeScreenChannelOptions";
import { Channel } from "./Channel";

export class WelcomeScreenChannel {
  channel: Channel;
  description: string;
  emojiId: string;
  emojiName: string;

  constructor(options: WelcomeScreenChannelOptions) {
    this.channel = options.channel;
    this.description = options.description;
    this.emojiId = options.emojiId || "";
    this.emojiName = options.emojiName;
  }
}
