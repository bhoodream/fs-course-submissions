import { useState } from "react";
import { getAuthUserLS, setAuthUserLS } from "../utils/auth";

export const useCurrentUser = () => {
  const [data, setData] = useState(() => getAuthUserLS() || null);

  const onLogin = (newUser) => {
    setData(newUser);
    setAuthUserLS(newUser);
  };

  const logOut = () => {
    setAuthUserLS(null);
    setData(null);
  };

  return { data, id: (data || {}).id, onLogin, logOut };
};
