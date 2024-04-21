import axios from "axios";

export const service = async (params) => {
  const { method, pathname, payload } = params;
  let data;
  let error;

  try {
    data = (await axios[method](`${BASE_URL}${pathname}`, payload)).data;
  } catch (e) {
    error = e;
    console.error(e);
  }

  return { data, error };
};

const BASE_URL = "http://localhost:3001";
