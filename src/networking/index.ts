import {AxiosError, AxiosResponse} from 'axios';
import {IParams, BaseApiResponse, TOKEN_TYPE} from './config';
import {isObject} from '@utilities/utils';
import instance from './axios';
import {APIs} from './API';
async function axiosAPI<S, Q = unknown>(
  params: IParams<Q>,
): Promise<BaseApiResponse<S>> {
  const {url, method, body, config, auth} = params;
  let data = body;

  if (auth === TOKEN_TYPE.Bearer) {
  }
  if (isObject(body)) {
    data = JSON.stringify(body);
  }

  return instance({
    url,
    method,
    data,
    headers: {...config},
  })
    .then((response: AxiosResponse) => {
      if (Array.isArray(response.data)) {
        return {
          data: response.data,
          status: response.status,
        };
      }
      return {
        ...response.data,
        status: response.status,
      };
    })
    .catch((error: AxiosError<S>) => ({
      message: error?.response?.data?.message,
      status: error?.response?.status,
    }));
}

function request<S, Q = unknown>(
  params: IParams<Q>,
): Promise<BaseApiResponse<S>> {
  return axiosAPI<S>({...params});
}

export {APIs, request};
