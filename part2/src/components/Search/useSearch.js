import { useCallback } from "react";
import { useState } from "react";

export const useSearch = (defaultValue = "") => {
  const [search, setSearch] = useState(defaultValue);
  const onChange = useCallback((value) => setSearch(value), []);

  return {
    value: search,
    onChange,
  };
};
