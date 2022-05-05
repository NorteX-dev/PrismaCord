import { Role } from "../../src/structures/Role";
import { User } from "../../src/structures/User";

/**
 * Interface for EmojiOptions.
 */
export interface EmojiOptions {
  id: string;
  name: string;
  roles?: Array<Role>;
  user?: User;
  requireColons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}
