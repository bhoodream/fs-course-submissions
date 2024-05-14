import { Countries } from "./components/Countries";
import { Courses } from "./components/Courses";
import { Login } from "./components/Login";
import { PhoneBook } from "./components/PhoneBook";
import { User } from "./components/User";
import { useCurrentUser } from "./hooks/useCurrentUser";

function App() {
  const currentUser = useCurrentUser();

  return (
    <div>
      <h1>Fullstack Open Course</h1>
      {currentUser.data ? (
        <>
          <User data={currentUser.data} logOut={currentUser.logOut} />
          <Countries />
          <PhoneBook />
          <Courses />
        </>
      ) : (
        <Login onLogin={(user) => currentUser.onChange(user)} />
      )}
    </div>
  );
}

export default App;
