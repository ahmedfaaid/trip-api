import 'express-session';

declare module 'express-session' {
  export interface SessionData {
    username: string;
    userId: number;
    token: string;
  }
}
