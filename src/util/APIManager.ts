import { PrismaClient } from "../structures/PrismaClient";
import { APIParameters } from "../../lib/interfaces/APIParameters";
import axios from "axios";

export class APIManager {
  private DISCORD_API_BASE: string = "https://discord.com/api/v9";

  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  get(url: string, params: APIParameters = {}) {
    return new Promise(async (res, rej) => {
      axios({
        url: this.DISCORD_API_BASE + url,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bot " + this.client.token,
        },
      })
        .then((response) => res(response.data))
        .catch(rej);
    });
  }

  post(url: string, body: object, params?: APIParameters) {
    return new Promise(async (res, rej) => {
      axios({
        url: this.DISCORD_API_BASE + url,
        method: "POST",
        data: body,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bot " + this.client.token,
        },
      })
        .then((response) => res(response.data))
        .catch(rej);
    });
  }

  delete(url: string, params?: APIParameters) {
    return new Promise(async (res, rej) => {
      axios({
        url: this.DISCORD_API_BASE + url,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bot " + this.client.token,
        },
      })
        .then((response) => res(response.data))
        .catch(rej);
    });
  }

  patch(url: string, body: object, params?: APIParameters) {
    return new Promise(async (res, rej) => {
      axios({
        url: this.DISCORD_API_BASE + url,
        method: "PATCH",
        data: body,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bot " + this.client.token,
        },
      })
        .then((response) => res(response.data))
        .catch(rej);
    });
  }

  put(url: string, body: object, params?: APIParameters) {
    return new Promise(async (res, rej) => {
      axios({
        url: this.DISCORD_API_BASE + url,
        method: "PUT",
        data: body,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bot " + this.client.token,
        },
      })
        .then((response) => res(response.data))
        .catch(rej);
    });
  }
}
