export enum REQUESTS {
  POLLS = "polls",
  USERS = "user"
}

export enum REQUESTS_TYPE {
  GET = "GET",
  POST = "POST",
  PUT = "PUT"
}

export const PROTOCOL = "http";
export const URL = "localhost";
export const PORT = "3000";
export const CONTENT_TYPE = "application/json";
export const PATH = "api";

export const STORAGE_NAME = "userId";

export enum SOCKET_EVENTS {
  CONNECT_SUCCESS = "connect success",
  ADD_VOTE = "add vote",
  SET_ROOM = "set room",
  VOTE_ADDED = "vote added"
}