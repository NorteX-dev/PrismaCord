import { WelcomeScreenOptions } from "../../lib/interfaces/WelcomeScreenOptions";
import { WelcomeScreenChannel } from "./WelcomeScreenChannel";

export class WelcomeScreen {
  description: string;
  welcomeChannels: Array<WelcomeScreenChannel>;

  constructor(options: WelcomeScreenOptions) {
    this.description = options.description;
    this.welcomeChannels = options.welcomeChannels;
  }
}
