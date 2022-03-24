export default class Printer {
  port: number;
  host: string;
  constructor(port: number, host: string) {
    this.port = port;
    this.host = host;
  }

  messagePrint(): string {
    return `Server ${this.host}:${this.port} available.`;
  }
}
