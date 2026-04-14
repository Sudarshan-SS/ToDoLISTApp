export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  loginstatus: boolean;
  token: string;
  tokenExpiryTime:Date;
  resMessage:string;
}