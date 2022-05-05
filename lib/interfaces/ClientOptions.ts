/**
 * Interface for ClientOptions.
 */
export interface ClientOptions {
  token?: string;
  // TODO : Change to Intent class
  intents: string[];
  cache?: boolean;
}
