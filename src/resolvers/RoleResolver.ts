import { Client } from "../structures/Client";
import { Role } from "../structures/Role";
import { RoleTag } from "../structures/RoleTag";
import { Guild } from "../structures/Guild";

/**
 * Resolver for Role.
 *
 * @param {any} data
 * @param {Guild} guild
 * @param {Client} client
 */
export function RoleResolver(data: any, guild: Guild, client: Client) {
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
      tags: new RoleTag({
        botId: data.tag!.bot_id,
        integrationId: data.tag!.integration_id,
        premiumSubscriber: data.tag!.premium_subscriber,
      }),
      // @ts-ignore
    },
    guild,
    client
  );
}
