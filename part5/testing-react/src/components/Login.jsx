import PropTypes from "prop-types";
import { useState } from "react";
import { login } from "../services/auth";
import { getApiErrorMsg } from "../utils/api";

export const Login = ({ onLogin, notify }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await login({ username, password });

    if (response.data) {
      onLogin(response.data);

      setUsername("");
      setPassword("");
    } else if (response.error) {
      notify(getApiErrorMsg(response), "error");
    } else {
      notify("unknown error...", "error");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <p>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </p>
      <p>
        password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </p>
      <button type="submit">login</button>
    </form>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
};
