import { UniCafe } from "./UniCafe";

const course = {
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

function App() {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />

      <UniCafe />
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

export default App;
