import { useState } from "react";
import { login } from "../services/auth";
import { useAlert } from "./Alert/useAlert";
import { Alert } from "./Alert";
import { getApiErrorMsg } from "../utils/api";
import { setAuthUserLS } from "../utils/auth";

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await login({ username, password });

    if (response.data) {
      onLogin(response.data);
      setAuthUserLS(response.data);

      setUsername("");
      setPassword("");
    } else if (response.error) {
      alert.show(getApiErrorMsg(response), "error");
    } else {
      alert.show("unknown error...", "error");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <p>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </p>
      <p>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </p>
      <button type="submit">login</button>
      <Alert {...alert.state} />
    </form>
  );
};
