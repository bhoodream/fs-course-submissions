import { useState } from "react";
import { getAuthUserLS, setAuthUserLS } from "../utils/auth";

export const useCurrentUser = () => {
  const [user, setUser] = useState(() => getAuthUserLS() || null);

  const logOut = () => {
    setAuthUserLS(null);
    setUser(null);
  };

  return { data: user, onChange: (newUser) => setUser(newUser), logOut };
};
