import { ThreadMetadataOptions } from "../../lib/interfaces/ThreadMetadataOptions";
import { GuildUser } from "./GuildUser";

export class ThreadMetadata {
  readonly archived: boolean;
  readonly archiver: GuildUser | null;
  readonly autoArchiveDuration: number;
  readonly archiveTimestamp: string;
  readonly locked: boolean;

  constructor(options: ThreadMetadataOptions) {
    this.archived = options.archived;
    this.archiver = options.archiver || null;
    this.autoArchiveDuration = options.autoArchiveDuration;
    this.archiveTimestamp = options.archiveTimestamp;
    this.locked = !!options.locked;
  }
}
