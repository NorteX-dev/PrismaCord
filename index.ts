import { PrismaClient } from "./src/structures/PrismaClient";
import { ClientUserResolver } from "./src/resolvers/ClientUserResolver";
import { GuildUserResolver } from "./src/resolvers/GuildUserResolver";
import { MessageResolver } from "./src/resolvers/MessageResolver";
import { RoleResolver } from "./src/resolvers/RoleResolver";
import { UserResolver } from "./src/resolvers/UserResolver";
import { IntentsResolver } from "./src/resolvers/IntentsResolver";

export {
  // Structures
  PrismaClient,
  // Resolvers
  ClientUserResolver,
  GuildUserResolver,
  MessageResolver,
  RoleResolver,
  UserResolver,
  IntentsResolver,
};
