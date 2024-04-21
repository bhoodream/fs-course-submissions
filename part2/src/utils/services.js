import axios from "axios";

export const service = async (params) => {
  const { method, pathname, payload, baseUrl } = params;
  let data;
  let error;

  try {
    data = (await axios[method](`${baseUrl}${pathname}`, payload)).data;
  } catch (e) {
    error = e;
    console.error(e);
  }

  return { data, error };
};
