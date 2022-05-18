export default class Response {
  readonly statusCode;
  readonly body;

  constructor(statusCode: number, body: any) {
    this.statusCode = statusCode;
    this.body = body;
  }

  getHeaders() {
    return {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }

  send() {
    return {
      ...this.getHeaders(),
      statusCode: this.statusCode,
      body: JSON.stringify(this.body),
    };
  }
}
