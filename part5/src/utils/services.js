import axios from "axios";
import { getAuthUserLS } from "./auth";

export const service = async (params) => {
  const { method, pathname, payload, baseUrl } = params;
  const authToken = (getAuthUserLS() || {}).token;
  let data;
  let error;

  try {
    data = (
      await axios({
        method,
        url: `${baseUrl}${pathname}`,
        data: payload,
        headers: { Authorization: authToken },
      })
    ).data;
  } catch (e) {
    error = e;
    console.error(e);
  }

  return { data, error };
};
