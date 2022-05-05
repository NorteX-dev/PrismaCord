import { GuildUser } from "../../src/structures/GuildUser";
import { Guild } from "../../src/structures/Guild";
import { PresenceStatus } from "../../src/structures/PresenceStatus";
import { Activity } from "../../src/structures/Activity";

/**
 * Interface for PresenceOptions.
 */
export interface PresenceOptions {
  user: GuildUser;
  guild: Guild;
  status: string;
  activities: Array<Activity>;
  PresenceStatus: Array<PresenceStatus>;
}
