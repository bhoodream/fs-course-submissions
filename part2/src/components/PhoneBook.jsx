import { useMemo, useState } from "react";

export const PhoneBook = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");

  const visiblePersons = useMemo(
    () =>
      search
        ? persons.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
        : persons,
    [persons, search]
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Search onChange={setSearch} />
      <Form
        onData={(data) => setPersons((p) => [...p, { ...data }])}
        data={persons}
      />
      <List items={persons} visibleItems={visiblePersons} />
    </div>
  );
};

const Search = ({ onChange }) => (
  <p>
    Search:{" "}
    <input required name="search" onChange={(e) => onChange(e.target.value)} />
  </p>
);

const Form = ({ onData, data }) => {
  const [formState, setFormState] = useState({ name: "", phone: "" });

  const onChangeInput = ({ target: { name, value } }) =>
    setFormState((p) => ({ ...p, [name]: value }));

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      UNIQ_VALUES.some((name) => data.some((p) => p[name] === formState[name]))
    ) {
      return alert(
        `Some uniq values of phonebook (${UNIQ_VALUES}) is not uniq in new person: ${JSON.stringify(
          formState
        )}`
      );
    }

    onData({ ...formState });
    setFormState({ name: "", phone: "" });
  };

  return (
    <form onSubmit={onSubmit}>
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
  );
};

const List = ({ items, visibleItems }) => (
  <>
    <h3>Persons</h3>
    {items.length <= 0
      ? "no persons..."
      : visibleItems.length <= 0
      ? "no persons found..."
      : null}
    {visibleItems.map((p) => (
      <p key={p.name}>
        {p.name} {p.phone}
      </p>
    ))}
  </>
);

const INPUTS = [{ name: "name" }, { name: "phone" }];
const UNIQ_VALUES = ["name"];
