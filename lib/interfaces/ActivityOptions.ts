import { Timestamp } from "../../src/structures/Timestamp";
import { Emoji } from "../../src/structures/Emoji";
import { Party } from "../../src/structures/Party";
import { Assets } from "../../src/structures/Assets";
import { Secrets } from "../../src/structures/Secrets";
import { Button } from "../../src/structures/Button";

/**
 * Interface for ActivityOptions.
 */
export interface ActivityOptions {
  name: string;
  type: number;
  url?: string;
  createdAt: number;
  timestamps: Timestamp;
  applicationId?: string;
  details?: string;
  state?: string;
  emoji?: Emoji;
  party?: Party;
  assets?: Assets;
  secrets?: Secrets;
  instance?: boolean;
  flags?: number;
  buttons?: Array<Button>;
}
