import { User } from "../structures/User";
import { PrismaClient } from "../structures/PrismaClient";

/**
 * Resolver for User.
 *
 * @param {any} data
 * @param {PrismaClient} client
 */
export function UserResolver(data: any, client: PrismaClient) {
  return new User(
    {
      id: data.id,
      username: data.username,
      tag: data.discriminator,
      avatar: data.avatar,
      bot: data.bot,
      system: data.system,
      mfaEnabled: data.mfa_enabled,
      locale: data.locale,
      verified: data.verified,
      flags: data.flags,
      publicFlags: data.public_flags,
      premiumType: data.premium_type,
    },
    client
  );
}
