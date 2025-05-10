import { Button } from "./Button";

export const User = ({ data, logOut }) => {
  return (
    <p>
      {data.name} ({data.username}) logged in{" "}
      <Button text="log out" onClick={() => logOut()} />
    </p>
  );
};
