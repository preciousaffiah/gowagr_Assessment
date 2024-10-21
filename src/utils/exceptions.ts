export default class HttpException extends Error {
    public status: number;
    public message: string;
  
    constructor(status: number = 400, message = 'endpoint failed') {
      super();
      this.message = message;
      this.status = status;
    }
  }