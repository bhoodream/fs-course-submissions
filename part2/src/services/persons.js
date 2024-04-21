import { service } from "../utils/services";

export const getPersons = () => {
  return service({ method: "get", pathname: BASE_PATH_NAME });
};

export const createPerson = (payload) => {
  return service({ method: "post", pathname: BASE_PATH_NAME, payload });
};

export const updatePerson = (id, payload) => {
  return service({
    method: "put",
    pathname: `${BASE_PATH_NAME}/${id}`,
    payload,
  });
};

export const deletePerson = (id) => {
  return service({ method: "delete", pathname: `${BASE_PATH_NAME}/${id}` });
};

const BASE_PATH_NAME = "/persons";
