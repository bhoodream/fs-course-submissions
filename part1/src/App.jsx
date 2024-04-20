import { Anecdotes } from "./Anecdotes";
import { UniCafe } from "./UniCafe";

function App() {
  return (
    <div>
      <Header course={COURSE.name} />
      <Content parts={COURSE.parts} />
      <Total parts={COURSE.parts} />
      <UniCafe />
      <Anecdotes />
    </div>
  );
}

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(({ name, exercises }) => (
        <Part key={name} title={name} amount={exercises} />
      ))}
    </>
  );
};

const Part = ({ title, amount }) => (
  <p key={title}>
    {title} {amount}
  </p>
);

const Total = ({ parts }) => (
  <p>Number of exercises {parts.reduce((acc, p) => acc + p.exercises, 0)}</p>
);

const COURSE = {
  name: "Half Stack application development",
  parts: [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ],
};

export default App;
