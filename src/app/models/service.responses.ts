import { GeneralUser } from './user';

export class SearchUsersResponse {
  Response: GeneralUser[];
  ErrorCode: number;
  ThrottleSeconds: number;
  ErrorStatus: string;
  Message: string;
  MessageData: string;
}

export class BungieServiceResponse {
  Response: any;
  ErrorCode: number;
  ThrottleSeconds: number;
  ErrorStatus: string;
  Message: string;
  MessageData: string;
}
