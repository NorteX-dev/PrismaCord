import { GuildUser } from "../../src/structures/GuildUser";
import { Channel } from "../../src/structures/Channel";
import { Role } from "../../src/structures/Role";
import { Emoji } from "../../src/structures/Emoji";
import { VoiceState } from "../../src/structures/VoiceState";
import { Presence } from "../../src/structures/Presence";
import { WelcomeScreen } from "../../src/structures/WelcomeScreen";

/**
 * Interface for GuildOptions.
 */
export interface GuildOptions {
  id: string;
  name: string;
  icon: string;
  iconHash?: string;
  splash: string;
  discoverySplash?: string;
  owner: GuildUser;
  permissions?: string;
  afkChannel?: Channel;
  afkTimeout?: number;
  widgetEnabled?: boolean;
  widgetChannel?: Channel;
  verificationLevel: number;
  defaultMessageNotifications: number;
  explicitContentFilter: number;
  roles: Array<Role>;
  emojis: Array<Emoji>;
  features: Array<string>;
  mfaLevel: number;
  systemChannel?: Channel;
  systemChannelFlags?: number;
  ruleChannel?: Channel;
  joinedAt: string;
  large?: boolean;
  unavailable?: boolean;
  memberCount?: number;
  voiceStates?: Array<VoiceState>;
  members?: Array<GuildUser>;
  channels?: Array<Channel>;
  threads?: Array<Channel>;
  presences?: Array<Presence>;
  maxPresences?: number;
  maxMembers?: number;
  vanityUrlCode?: string;
  description?: string;
  banner?: string;
  premiumTier: number;
  totalNitroBoosts: number;
  preferredLocale: string;
  publicUpdatesChannel?: Channel;
  maxVideoChannelUsers?: number;
  approximateMemberCount?: number;
  approximatePresenceCount?: number;
  welcomeScreen?: WelcomeScreen;
  nsfw: boolean;
}
