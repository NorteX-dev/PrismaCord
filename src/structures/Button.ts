import { ButtonOptions } from "../../lib/interfaces/ButtonOptions";

/**
 * [TBD]
 */
export class Button {
  type: number;
  style: number;
  label?: string;
  emoji?: string;
  custom_id?: string;
  url?: string;
  disabled: boolean;

  constructor(options: ButtonOptions) {
    /**
     * Number for button: 2
     * @type {number}
     */
    this.type = options.type;

    /**
     * Button Styles
     * @type {number}
     */
    this.style = options.style;

    /**
     * Button Label (Max 80 Characters)
     * @type {string}
     */
    this.label = options.label;

    /**
     * Emojis for the Button
     * @type {string}
     */
    this.emoji = options.emoji;

    /**
     * Custom ID For Button
     * @type {string}
     */
    this.custom_id = options.custom_id;

    /**
     * Link String for Button (only available when `style` is equal to 5)
     * @type {string}
     */
    this.url = options.url;

    /**
     * Whether the button is disabled
     * @type {boolean}
     */
    this.disabled = options.disabled
  }
  public setEmoji(emoji: string) {
    this.emoji = emoji;
    return this;
  }
  public setCustomId(custom_id: string) {
    this.custom_id = custom_id;
    return this;
  }
  public setLabel(label?: string) {
    this.label = label;
    return this;
  }
  public setStyle(style: number) {
    this.style = style;
    return this;
  }
  public setLink(link: string) {
    this.url = link;
    return this;
  }
  public toJSON() {
    return {
      type: this.type,
      style: this.style,
      label: this.label,
      emoji: this.emoji,
      custom_id: this.custom_id,
      url: this.url,
      disabled: this.disabled
    }
  }
}
