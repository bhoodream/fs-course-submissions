import { useMemo, useState } from "react";
import { Button } from "./Button";

export const Anecdotes = () => {
  const [state, setState] = useState(() => ({
    current: 0,
    votes: ANECDOTES.reduce((acc, _, i) => ({ ...acc, [i]: 0 }), {}),
  }));
  const bestAnecdote = useMemo(
    () =>
      ANECDOTES[Object.entries(state.votes).sort((a, b) => b[1] - a[1])[0][0]],
    [state.votes]
  );

  return (
    <div>
      <h2>Anecdotes</h2>
      {ANECDOTES[state.current]}
      <p>has {state.votes[state.current]} votes</p>
      <Button
        text={"vote"}
        onClick={() =>
          setState((p) => ({
            ...p,
            votes: { ...p.votes, [p.current]: p.votes[p.current] + 1 },
          }))
        }
      />
      <Button
        text={"next anecdote"}
        onClick={() =>
          setState((p) => ({
            ...p,
            current: (p.current + 1) % ANECDOTES.length,
          }))
        }
      />
      <h3>Anecdote with most votes</h3>
      <p>{bestAnecdote}</p>
    </div>
  );
};

const ANECDOTES = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];
