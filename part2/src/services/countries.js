import { service } from "../utils/services";

export const getCountries = () => {
  return service({ baseUrl: BASE_URL, method: "get", pathname: "/all" });
};

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";
