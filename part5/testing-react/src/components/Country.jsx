import { useEffect } from "react";
import { useState } from "react";
import { getCityWeather } from "../services/countries";
import { useAlert } from "./Alert/useAlert";
import { Alert } from "./Alert";

export const Country = ({ data }) => {
  const [weather, setWeather] = useState();
  const alert = useAlert();

  useEffect(() => {
    getCityWeather(data.capital).then((response) => {
      if (response.error)
        return alert.show(
          `Error on country weather: ${response.error}`,
          "error"
        );

      setWeather(response.data);
    });
  }, [data.capital]);

  return (
    <>
      <h3>{data.name.common}</h3>
      <p>
        <b>Capital:</b> {data.capital}
        <br />
        <b>Area:</b> {data.area}
      </p>
      <h4>Languages:</h4>
      <ull>
        {Object.values(data.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ull>
      <br />
      <img
        src={data.flags.png}
        alt="flag"
        style={{ border: "1px solid black" }}
      />
      {weather && (
        <>
          <h4>Weather in {weather.name}</h4>
          <p>
            temperature: {Math.round(convertKelvinToCelsius(weather.main.temp))}{" "}
            celsius
          </p>
          {weather.weather.map(({ id, icon }) => (
            <img key={id} src={getWetherIcon(icon)} />
          ))}
          <p>wind {weather.wind.speed} m/s</p>
        </>
      )}
      <Alert {...alert.state} />
    </>
  );
};

const convertKelvinToCelsius = (kelvins) => kelvins - 273.15;
const getWetherIcon = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;
