import { useMemo, useState } from "react";

export const UniCafe = () => {
  const [state, setState] = useState(() =>
    FEEDBACK_TYPES.reduce((acc, t) => ({ ...acc, [t]: 0 }), {})
  );

  return (
    <>
      <h2>UniCafe</h2>
      <Feedback
        onChange={(type) => setState((p) => ({ ...p, [type]: p[type] + 1 }))}
      />
      <Statistics data={state} />
    </>
  );
};

const Feedback = ({ onChange }) => {
  return (
    <>
      <h3>give feedback</h3>
      {FEEDBACK_TYPES.map((f) => (
        <Button key={f} text={f} onClick={() => onChange(f)} />
      ))}
    </>
  );
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ data }) => {
  const [hasStats, all, average, positive] = useMemo(() => {
    const allValue = FEEDBACK_TYPES.reduce((acc, f) => acc + data[f], 0);

    return [
      FEEDBACK_TYPES.some((f) => data[f]),
      allValue,
      allValue
        ? FEEDBACK_TYPES.reduce(
            (acc, f) => acc + FEEDBACK_VALUES[f] * data[f],
            0
          ) / allValue
        : 0,
      allValue ? data.good / allValue : 0,
    ];
  }, [data]);

  if (!hasStats) return <p>No feedback given</p>;

  return (
    <>
      <h3>stats</h3>
      <table>
        <tbody>
          {FEEDBACK_TYPES.map((f) => (
            <StatisticLine key={f} text={f} value={data[f]} />
          ))}
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text={"average"} value={average} />
          <StatisticLine text={"positive"} value={positive} />
        </tbody>
      </table>
    </>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const FEEDBACK_TYPES = ["good", "neutral", "bad"];
const FEEDBACK_VALUES = {
  good: 1,
  neutral: 0,
  bad: -1,
};
