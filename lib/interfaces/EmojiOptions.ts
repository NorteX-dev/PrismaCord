import { User } from "../../src/structures/User";

/**
 * Interface for EmojiOptions.
 */
export interface EmojiOptions {
  id: string;
  name: string;
  user?: User;
  requireColons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}
