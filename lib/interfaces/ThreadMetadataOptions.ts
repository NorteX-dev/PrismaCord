import { GuildUser } from "../../src/structures/GuildUser";

/**
 * Interface for ThreadMetadataOptions.
 */
export interface ThreadMetadataOptions {
  archived: boolean;
  archiver?: GuildUser;
  autoArchiveDuration: number;
  archiveTimestamp: string;
  locked?: boolean;
}
