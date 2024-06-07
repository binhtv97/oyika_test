import {AxiosRequestHeaders, RawAxiosRequestHeaders} from 'axios';

export const TOKEN: IToken = {
  token: 'TOKEN_KEY',
  refreshToken: 'REFRESH_TOKEN_KEY',
  deviceToken: 'DEVICE_TOKEN_KEY',
};

export const AUTO_LOGIN = {
  rememberMe: 'REMEMBER_ME',
  keyBiometrics: 'KEY_BIOMETRICS',
} as const;

export const RESPONSE_CODE: IResponseCode = {
  success: [200, 201],
  unauthorized: [401, 403],
  badRequest: [400, 404],
};

export const TOKEN_TYPE: ITokenType = {
  Bearer: 'Bearer',
  Basic: 'Basic',
};

export const AXIOS_TIMEOUT = 6000;

export interface IToken {
  token: string;
  refreshToken: string;
  deviceToken: string;
}

export interface IResponseCode {
  success: number[];
  unauthorized: number[];
  badRequest: number[];
}

export interface ITokenType {
  Bearer: string;
  Basic: string;
}

export interface IParams<T = undefined> {
  url: string;
  method?: string;
  body?: T | string;
  config?: AxiosRequestHeaders | RawAxiosRequestHeaders;
  auth?: string;
}

export type BaseApiResponse<T> = {
  [key in keyof T]: T[key];
} & {
  data: T;
  status: number;
  message: string;
};
