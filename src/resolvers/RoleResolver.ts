import { PrismaClient } from "../structures/PrismaClient";
import { Role } from "../structures/Role";
import { RoleTag } from "../structures/RoleTag";
import { Guild } from "../structures/Guild";

/**
 * Resolver for Role.
 *
 * @param {any} data
 * @param {Guild} guild
 * @param {PrismaClient} client
 */
export function RoleResolver(
  data: any,
  guild: Guild,
  client: PrismaClient
): Role {
  return new Role(
    {
      id: data.id,
      name: data.name,
      color: data.color,
      hoist: data.hoist,
      managed: data.managed,
      mentionable: data.mentionable,
      permissions: data.permissions,
      position: data.position,
      icon: data.icon,
      tags: new RoleTag({
        botId: data.tag?.bot_id,
        integrationId: data.tag?.integration_id,
        premiumSubscriber: data.tag?.premium_subscriber,
      }),
    },
    guild,
    client
  );
}
