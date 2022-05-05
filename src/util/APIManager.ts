import { PrismaClient } from "../structures/PrismaClient";
import { APIParameters } from "../../lib/interfaces/APIParameters";
export class APIManager {
  private DISCORD_API_BASE: string = "https://discord.com/api/v9";

  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  get(url: string, params: APIParameters = {}) {
    return new Promise(async (res, rej) => {
      fetch(this.DISCORD_API_BASE + url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bot " + this.client.token,
        },
      })
        .then((d) => d.json())
        .then((response) => res(response))
        .catch(rej);
    });
  }

  post(url: string, body: object, params?: APIParameters) {
    return new Promise(async (res, rej) => {
      fetch(this.DISCORD_API_BASE + url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bot " + this.client.token,
        },
      })
        .then((d) => d.json())
        .then((response) => res(response))
        .catch(rej);
    });
  }

  delete(url: string, params?: APIParameters) {
    return new Promise(async (res, rej) => {
      fetch(this.DISCORD_API_BASE + url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bot " + this.client.token,
        },
      })
        .then((d) => d.json())
        .then((response) => res(response))
        .catch(rej);
    });
  }

  patch(url: string, body: object, params?: APIParameters) {
    return new Promise(async (res, rej) => {
      fetch(this.DISCORD_API_BASE + url, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bot " + this.client.token,
        },
      })
        .then((d) => d.json())
        .then((response) => res(response))
        .catch(rej);
    });
  }

  put(url: string, body: object, params?: APIParameters) {
    return new Promise(async (res, rej) => {
      fetch(this.DISCORD_API_BASE + url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bot " + this.client.token,
        },
      })
        .then((d) => d.json())
        .then((response) => res(response))
        .catch(rej);
    });
  }
}
