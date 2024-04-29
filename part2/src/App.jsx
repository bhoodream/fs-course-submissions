import { Countries } from "./components/Countries";
import { Courses } from "./components/Courses";
import { PhoneBook } from "./components/PhoneBook";

function App() {
  return (
    <div>
      <h1>Fullstack Open Course</h1>
      <Countries />
      <PhoneBook />
      <Courses />
    </div>
  );
}

export default App;
