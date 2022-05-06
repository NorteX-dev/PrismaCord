import { Role } from "../../src/structures/Role";
import { Guild } from "../../src/structures/Guild";

/**
 * Interface for GuildUserOptions.
 */
export interface GuildUserOptions {
  id: string;
  username: string;
  tag: string;
  avatar: string;
  bot: boolean;
  system?: boolean;
  mfaEnabled?: boolean;
  locale?: string;
  email?: string;
  verified?: boolean;
  flags?: number;
  premiumType?: number;
  publicFlags?: number;
  nickname: string;
  roles: Array<Role>;
  joinedAt: string;
  boostingSince: string;
  deaf: boolean;
  mute: boolean;
  communication_disabled_until: string;
  pending?: boolean;
  permissions?: string;
  guild: Guild;
}
