import { useCallback } from "react";
import { useState } from "react";

export const useSearch = () => {
  const [search, setSearch] = useState("");
  const onChange = useCallback((value) => setSearch(value), []);

  return {
    value: search,
    onChange,
  };
};
