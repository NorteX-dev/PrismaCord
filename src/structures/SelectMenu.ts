import {
  SelectMenuOptions,
  SelectMenuOptOptions,
} from "../../lib/interfaces/SelectMenuOptions";

export class SelectMenu {
  type: 3;
  customId: string;
  options?: Array<SelectMenuOptOptions>;
  placeholder: string;
  minValues: number;
  maxValues: number;
  disabled: boolean;

  constructor(options: SelectMenuOptions) {
    /**
     * Number for SelectMenu: 3
     * @type {number}
     */
    this.type = options.type;

    /**
     * Custom ID for the SelectMenu
     * @type {string}
     */
    this.customId = options.custom_id;

    /**
     * Array of select options
     * @type {Array}
     */
    this.options = [];

    /**
     * Custom placeholder text if nothing is selected, max 150 characters
     * @type {string}
     */
    this.placeholder = options.placeholder;

    /**
     * the minimum number of items that must be chosen; default 1, min 0, max 25
     * @type {number}
     */
    this.minValues = options.min_values;

    /**
     * the maximum number of items that must be chosen; default 1, max 25
     * @type {number}
     */
    this.maxValues = options.max_values;

    /**
     * disable the select menu, default false
     * @type {boolean}
     */
    this.disabled = options.disabled;
  }
  public setCustomId(id: string) {
    this.customId = id;
    return this;
  }
  public setPlaceholder(placeholder: string) {
    this.placeholder = placeholder;
    return this;
  }
  public setMinValues(num: number) {
    this.minValues = num;
    return this;
  }
  public setMaxValues(num: number) {
    this.maxValues = num;
    return this;
  }
  public setDisabled(value: boolean) {
    this.disabled = value;
    return this;
  }
  public addOption(
    label: string,
    value: string,
    description: string,
    emoji?: string,
    defaultValue?: boolean
  ) {
    this.options?.push({
      label,
      value,
      description,
      emoji,
      default: defaultValue,
    });
    return this;
  }
  public toJSON() {
    return {
      custom_id: this.customId,
      placeholder: this.placeholder,
      min_values: this.minValues,
      max_values: this.maxValues,
      disabled: this.disabled,
      options: this.options,
    };
  }
}
