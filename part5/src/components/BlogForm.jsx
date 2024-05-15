import { useState } from "react";

export const BlogForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);

  const onChangeInput = ({ target: { name, value } }) =>
    setFormState((p) => ({ ...p, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(await onSubmit({ ...formState }))) return;

    setFormState(INITIAL_FORM_STATE);
  };

  return (
    <>
      <h3>Create blog</h3>
      <form onSubmit={handleSubmit}>
        {INPUTS.map(({ name }) => (
          <p key={name}>
            {name}
            <input
              required
              value={formState[name]}
              name={name}
              onChange={onChangeInput}
            />
          </p>
        ))}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const INITIAL_FORM_STATE = { title: "", author: "", url: "" };
const INPUTS = [{ name: "title" }, { name: "author" }, { name: "url" }];
