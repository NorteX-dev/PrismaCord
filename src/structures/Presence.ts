import { PresenceOptions } from "../../lib/interfaces/PresenceOptions";
import { GuildUser } from "./GuildUser";
import { Guild } from "./Guild";
import { PresenceStatus } from "./PresenceStatus";
import { Activity } from "./Activity";

export class Presence {
  user: GuildUser;
  guild: Guild;
  status: string;
  activities: Array<Activity>;
  PresenceStatus: Array<PresenceStatus>;

  constructor(options: PresenceOptions) {
    this.user = options.user;
    this.guild = options.guild;
    this.status = options.status;
    this.activities = options.activities;
    this.PresenceStatus = options.PresenceStatus;
  }
}
