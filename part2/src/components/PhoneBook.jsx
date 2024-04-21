import { useEffect } from "react";
import { useMemo, useState } from "react";
import {
  createPerson,
  getPersons,
  deletePerson,
  updatePerson,
} from "../services/persons";
import { useDataInvalidation } from "../hooks/useDataInvalidation";
import { Button } from "./Button";

export const PhoneBook = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const invalidation = useDataInvalidation();

  const visiblePersons = useMemo(
    () =>
      search
        ? persons.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
        : persons,
    [persons, search]
  );

  const addPerson = async (data) => {
    const existsPerson = persons.find((person) =>
      UNIQ_VALUES.some((v) => person[v] === data[v])
    );

    if (
      existsPerson &&
      !confirm(
        `${existsPerson.name} is already added to phonebook, replace data with new one?`
      )
    )
      return false;

    const response = await (existsPerson
      ? updatePerson(existsPerson.id, data)
      : createPerson(data));

    if (response.error) {
      alert(
        `Error on person ${existsPerson ? "update" : "create"}: ${
          response.error
        }`
      );

      return false;
    }

    invalidation.invalidate();

    return true;
  };

  const removePerson = async (person) => {
    if (!confirm(`Delete ${person.name} ?`)) return;

    const response = await deletePerson(person.id);

    if (response.error)
      return alert(
        `Error on person (${person.name}) delete: ${response.error}`
      );

    invalidation.invalidate();
  };

  useEffect(() => {
    getPersons().then((response) => setPersons(response.data));
  }, [invalidation.date]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Search onChange={setSearch} />
      <Form onData={addPerson} />
      <List
        items={persons}
        visibleItems={visiblePersons}
        onDelete={removePerson}
      />
    </div>
  );
};

const Search = ({ onChange }) => (
  <p>
    Search:{" "}
    <input required name="search" onChange={(e) => onChange(e.target.value)} />
  </p>
);

const Form = ({ onData }) => {
  const [formState, setFormState] = useState({ name: "", phone: "" });

  const onChangeInput = ({ target: { name, value } }) =>
    setFormState((p) => ({ ...p, [name]: value }));

  const onSubmit = (e) => {
    e.preventDefault();

    if (!onData({ ...formState })) return;

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

const List = ({ items, visibleItems, onDelete }) => (
  <>
    <h3>Persons</h3>
    {items.length <= 0
      ? "no persons..."
      : visibleItems.length <= 0
      ? "no persons found..."
      : null}
    {visibleItems.map((p) => (
      <p key={p.name}>
        {p.name} {p.phone} <Button text="delete" onClick={() => onDelete(p)} />
      </p>
    ))}
  </>
);

const INPUTS = [{ name: "name" }, { name: "phone" }];
const UNIQ_VALUES = ["name"];
