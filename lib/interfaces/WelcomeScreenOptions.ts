import { WelcomeScreenChannel } from "../../src/structures/WelcomeScreenChannel";

/**
 * Interface for WelcomeScreenOptions.
 */
export interface WelcomeScreenOptions {
  description: string;
  welcomeChannels: Array<WelcomeScreenChannel>;
}
