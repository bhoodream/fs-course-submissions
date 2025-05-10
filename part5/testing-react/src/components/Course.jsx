export const Course = ({ data }) => (
  <>
    <Header course={data.name} />
    <Content parts={data.parts} />
    <Total parts={data.parts} />
  </>
);

const Header = ({ course }) => {
  return <h3>{course}</h3>;
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
  <strong>
    total {parts.reduce((acc, p) => acc + p.exercises, 0)} exercises
  </strong>
);
