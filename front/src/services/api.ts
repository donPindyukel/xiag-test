import axios, { AxiosPromise } from "axios";
import {
  CONTENT_TYPE,
  REQUESTS,
  REQUESTS_TYPE,
  PATH,
  PORT,
  PROTOCOL,
  URL
} from "Constants";
import { ICreatePollReq } from "Models";

axios.defaults.headers.common = {};
axios.defaults.headers.common.accept = CONTENT_TYPE;

const ENDPOINT = `${PROTOCOL}://${URL}:${PORT}/${PATH}/`;

export const API = {
  createQuestion(params: ICreatePollReq): AxiosPromise<{} | any[]> {
    return axios({
      method: REQUESTS_TYPE.POST,
      url: `${ENDPOINT}${REQUESTS.POLLS}`,
      data: params
    });
  },

  getPoll(params: string): AxiosPromise<any | any[]> {
    return axios({
      method: REQUESTS_TYPE.GET,
      url: `${ENDPOINT}${REQUESTS.POLLS}/${params}`
    });
  },

  createUser(name: string): AxiosPromise<any | any[]> {
    return axios({
      method: REQUESTS_TYPE.POST,
      url: `${ENDPOINT}${REQUESTS.USERS}`,
      data: { name }
    });
  },

  getUser(id: string): AxiosPromise<any | any[]> {
    return axios({
      method: REQUESTS_TYPE.GET,
      url: `${ENDPOINT}${REQUESTS.USERS}/${id}`
    });
  },

  sendAnswer(params: any): AxiosPromise<any | any[]> {
    return axios({
      method: REQUESTS_TYPE.PUT,
      url: `${ENDPOINT}${REQUESTS.USERS}`,
      data: params
    });
  },

  getPollResults(): AxiosPromise<any | any[]> {
    return axios({
      method: REQUESTS_TYPE.GET,
      url: `${ENDPOINT}${REQUESTS.POLLS}`
    });
  }
};
