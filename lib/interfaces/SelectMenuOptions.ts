/**
 * Interface for SelectMenuOptions
 */

export interface SelectMenuOptions {
    type: 3;
    custom_id: string;
    options: Array<SelectMenuOptOptions>;
    placeholder: string;
    min_values: number;
    max_values: number;
    disabled: boolean;
}

export interface SelectMenuOptOptions {
    label: string;
    value: string;
    description?: string;
    emoji?: string;
    default?: boolean
}