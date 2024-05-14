import { service } from "../utils/services";

export const login = (payload) => {
  return service({ baseUrl: BASE_URL, method: "post", pathname: "", payload });
};

const BASE_URL = "/api/login";
