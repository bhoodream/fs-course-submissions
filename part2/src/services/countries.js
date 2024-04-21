import { service } from "../utils/services";

export const getCountries = () => {
  return service({
    baseUrl: "https://studies.cs.helsinki.fi/restcountries/api",
    method: "get",
    pathname: "/all",
  });
};

export const getCityWeather = (city) => {
  return service({
    baseUrl: "https://api.openweathermap.org/data/2.5",
    method: "get",
    pathname: "/weather",
    payload: {
      params: new URLSearchParams({
        q: city,
        appid: import.meta.env.VITE_SOME_KEY,
      }),
    },
  });
};
