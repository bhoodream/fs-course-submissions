import { AUTH_USER_LS_KEY } from "../constants/auth";

export const setAuthUserLS = (user) =>
  window.localStorage.setItem(AUTH_USER_LS_KEY, JSON.stringify(user));

export const getAuthUserLS = () =>
  JSON.parse(window.localStorage.getItem(AUTH_USER_LS_KEY) || null);
