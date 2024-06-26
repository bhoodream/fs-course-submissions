import { Anecdotes } from "./components/Anecdotes";
import { Courses } from "./components/Courses";
import { UniCafe } from "./components/UniCafe";

function App() {
  return (
    <div>
      <h1>Fullstack Open</h1>
      <Courses />
      <UniCafe />
      <Anecdotes />
    </div>
  );
}

export default App;
