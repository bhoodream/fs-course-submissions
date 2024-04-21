import { useEffect } from "react";
import { useState } from "react";
import { getCountries } from "../services/countries";
import { Alert } from "./Alert";
import { useAlert } from "./Alert/useAlert";
import { Search } from "./Search";
import { useSearch } from "./Search/useSearch";
import { useMemo } from "react";
import { Country } from "./Country";
import { Button } from "./Button";

export const Countries = () => {
  const [countries, setCountries] = useState([]);
  const search = useSearch();
  const [visibleCountries, exactCountry] = useMemo(
    () => [
      search.value
        ? countries.filter((c) =>
            c.name.common.toLowerCase().includes(search.value.toLowerCase())
          )
        : [],
      countries.find(
        (c) => c.name.common.toLowerCase() === search.value.toLowerCase()
      ),
    ],
    [countries, search.value]
  );
  const alert = useAlert();

  useEffect(() => {
    getCountries().then((response) => {
      if (response.error)
        return alert.show(`Error on countries: ${response.error}`, "error");

      setCountries(response.data);
    });
  }, []);

  return (
    <>
      <h2>Countries</h2>
      {countries.length > 0 && (
        <>
          <Search {...search} />
          {exactCountry ? (
            <Country data={exactCountry} />
          ) : !search.value ? (
            "Write something in the search..."
          ) : visibleCountries.length <= 0 ? (
            "No countries..."
          ) : visibleCountries.length > 10 ? (
            "Too many matches, specify another filter"
          ) : visibleCountries.length === 1 ? (
            <Country data={visibleCountries[0]} />
          ) : (
            visibleCountries.map((c) => (
              <p key={c.name.common}>
                {c.name.common}{" "}
                <Button
                  text="show"
                  onClick={() => search.onChange(c.name.common)}
                />
              </p>
            ))
          )}
        </>
      )}

      <Alert {...alert.state} />
    </>
  );
};
