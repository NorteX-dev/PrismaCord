/**
 * Interface for ButtonOptions.
 */
export interface ButtonOptions {
  type: 2;
  style: 1 | 2 | 3 | 4 | 5;
  label?: string;
  emoji?: string;
  custom_id?: string;
  url?: string;
  disabled: boolean;
}
