import { ClientOptions } from "../../lib/interfaces/ClientOptions";
import { EventOptions } from "../../lib/interfaces/EventOptions";
import { APIManager } from "../util/APIManager";
import { Websocket } from "../websocket/Websocket";
import { ClientUser } from "./ClientUser";
import { ClientUserResolver } from "../resolvers/ClientUserResolver";
import { UserResolver } from "../resolvers/UserResolver";
import { EventEmitter } from "events";
import { LoginError } from "../errors/LoginError";

/**
 * Starting point of any bot.
 */
export class PrismaClient extends EventEmitter {
  token: string | undefined;
  cache: boolean;
  socket: Websocket;
  events: Array<EventOptions>;
  api: APIManager;
  user: ClientUser;
  /**
   * Options for the bot.
   * @example
   * const client = new PrismaClient();
   * @param options {ClientOptions}
   */
  constructor(options: ClientOptions = {}) {
    super();
    // User defined
    this.token = options.token;
    this.cache = !!options.cache;

    // Private
    this.user = new ClientUser(
      { id: "", username: "", tag: "", avatar: "", bot: true },
      this
    );
    this.socket = new Websocket(this);
    this.events = [];
    this.api = new APIManager(this);
  }

  /**
   * Logs the client to Discord using a websocket connection.
   * @returns {Promise<boolean>}
   * @example client.login('token');
   */
  public async connect(token: string) {
    return new Promise<boolean>(async (res, rej) => {
      if (!token || !token.length) throw new Error("INVALID_TOKEN");
      this.token = token.replace(/^(Bot|Bearer)\s*/i, "");
      this.user = ClientUserResolver(await this.api.get(`/users/@me`), this);
      await this.socket
        .connect(token)
        .then(() => {
          this.emit("ready", this.user);
          res(true);
        })
        .catch(() => rej(new LoginError()));
    });
  }

  public async fetchUser(id: string) {
    const data = await this.api.get(`/users/${id}`);
    return UserResolver(data, this);
  }
}
