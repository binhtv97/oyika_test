"use client";
import {AnyAction, Store} from "@reduxjs/toolkit";
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {AXIOS_TIMEOUT, RESPONSE_CODE, TOKEN_TYPE} from "./config";
import {RootState} from "@store/store";
import {APIs} from "./API";

let store: Store<RootState, AnyAction>;

const instance = axios.create({
  timeout: AXIOS_TIMEOUT,
  withCredentials: true,
  baseURL: "https://echo.zuplo.io/",
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
  data: {},
});

export const injectStore = (_store: Store<RootState, AnyAction>) => {
  store = _store;
};

export function setToken(token: string, type: string) {
  switch (type) {
    case TOKEN_TYPE.Bearer:
      instance.defaults.headers.common["Authorization"] = "Bearer " + token;
      break;
    default: {
      instance.defaults.headers.common.Authorization = token;
    }
  }
}

const logout = () => {};

const handleRefreshToken = async (
  refreshToken: string,
  originalConfig: InternalAxiosRequestConfig
): Promise<AxiosRequestConfig | void> =>
  // Call RefreshToken API
  {
    // const accessToken = "";
    // if (accessToken) {
    //   setToken(accessToken, TOKEN_TYPE.Bearer);
    // }
    // console.log("new one");
    // return instance
    //   .patch(APIs.RefreshToken.url, {
    //     refresh_token: refreshToken,
    //     grant_type: "refresh_token",
    //   })
    //   .then((response: AxiosResponse) => {
    //     const {data} = response;
    //     const {access_token} = data;
    //     // store.dispatch(appActions.onLogin(data));
    //     const header = {...originalConfig.headers};
    //     header["Authorization"] = "Beare " + access_token;
    //     const newConfig = {...originalConfig, headers: header};
    //     return instance(newConfig);
    //   })
    //   .catch((er) => {
    //     // Remove all keys and back to login screen to get new token
    //     // clearAllData();
    //     logout();
    //   });
  };

const interceptor = instance.interceptors.response.use(
  (response: AxiosResponse) =>
    // Do something with response data
    response,
  async (error: AxiosError) => {
    // const originalConfig = error?.config as InternalAxiosRequestConfig;
    // const refreshToken = store.getState().app.refreshToken;
    // const isTokenExpired = RESPONSE_CODE.unauthorized.includes(
    //   error?.response?.status as number,
    // );
    // if (isTokenExpired) {
    //   if (refreshToken) {
    //     // Eject the interceptor so it doesn't loop in case
    //     instance.interceptors.response.eject(interceptor);

    //     // handle refresh token when the token has expired
    //     return handleRefreshToken(refreshToken, originalConfig);
    //   } else {
    //     // Do something when expired token
    //   }
    // }
    return Promise.reject(error);
  }
);

export default instance;
