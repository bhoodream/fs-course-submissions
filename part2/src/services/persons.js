import { service } from "../utils/services";

export const getPersons = () => {
  return service({ baseUrl: BASE_URL, method: "get", pathname: "" });
};

export const createPerson = (payload) => {
  return service({ baseUrl: BASE_URL, method: "post", pathname: "", payload });
};

export const updatePerson = (id, payload) => {
  return service({
    baseUrl: BASE_URL,
    method: "put",
    pathname: `/${id}`,
    payload,
  });
};

export const deletePerson = (id) => {
  return service({ baseUrl: BASE_URL, method: "delete", pathname: `/${id}` });
};

const BASE_URL = "http://localhost:3001/api/persons";
