export class LoginError extends Error {
  constructor() {
    super("Couldn't login with the token provided.");
    this.name = this.constructor.name;
  }
}
