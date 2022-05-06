import { PrismaClient } from "./src/structures/PrismaClient";
import { ClientUserResolver } from "./src/resolvers/ClientUserResolver";
import { GuildUserResolver } from "./src/resolvers/GuildUserResolver";
import { MessageResolver } from "./src/resolvers/MessageResolver";
import { RoleResolver } from "./src/resolvers/RoleResolver";
import { UserResolver } from "./src/resolvers/UserResolver";
import { IntentsBitflagsResolver } from "./src/resolvers/IntentsBitflagsResolver";

export {
  // Structures
  PrismaClient,
  // Resolvers
  ClientUserResolver,
  GuildUserResolver,
  MessageResolver,
  RoleResolver,
  UserResolver,
  IntentsBitflagsResolver,
};
