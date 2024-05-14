import { useState } from "react";
import { getAuthUserLS, setAuthUserLS } from "../utils/auth";

export const useCurrentUser = () => {
  const [data, setData] = useState(() => getAuthUserLS() || null);

  const onChange = (newUser) => setData(newUser);
  const logOut = () => {
    setAuthUserLS(null);
    setData(null);
  };

  return { data, onChange, logOut };
};
