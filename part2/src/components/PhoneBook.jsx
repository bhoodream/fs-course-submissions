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
import { useAlert } from "./Alert/useAlert";
import { Alert } from "./Alert";
import { Search } from "./Search";
import { useSearch } from "./Search/useSearch";

export const PhoneBook = () => {
  const [persons, setPersons] = useState([]);
  const search = useSearch();
  const alert = useAlert();
  const invalidation = useDataInvalidation();

  const visiblePersons = useMemo(
    () =>
      search.value
        ? persons.filter((p) =>
            p.name.toLowerCase().includes(search.value.toLowerCase())
          )
        : persons,
    [persons, search.value]
  );

  const addPerson = async (data) => {
    const existsPerson = persons.find((person) =>
      UNIQ_FIELDS.some((v) => person[v] === data[v])
    );
    const operation = existsPerson ? "update" : "create";

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
      alert.show(`Error on person ${operation}: ${response.error}`, "error");

      return false;
    }

    alert.show(`${operation} ${data.name}`, "success");

    invalidation.invalidate();

    return true;
  };

  const removePerson = async (person) => {
    if (!confirm(`Delete ${person.name} ?`)) return;

    const response = await deletePerson(person.id);

    if (response.error)
      return alert.show(
        `Error on person (${person.name}) delete: ${response.error}`,
        "error"
      );

    alert.show(`Deleted ${person.name}`, "success");

    invalidation.invalidate();
  };

  useEffect(() => {
    getPersons().then((response) => {
      if (response.error)
        return alert.show(`Error on persons: ${response.error}`, "error");

      setPersons(response.data);
    });
  }, [invalidation.date, alert.show]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Form onData={addPerson} />
      <Alert {...alert.state} />
      <List
        search={<Search {...search} />}
        items={persons}
        visibleItems={visiblePersons}
        onDelete={removePerson}
      />
    </div>
  );
};

const Form = ({ onData }) => {
  const [formState, setFormState] = useState({ name: "", phone: "" });

  const onChangeInput = ({ target: { name, value } }) =>
    setFormState((p) => ({ ...p, [name]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!(await onData({ ...formState }))) return;

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

const List = ({ items, visibleItems, onDelete, search }) => (
  <>
    <h3>Persons</h3>
    {search}
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
const UNIQ_FIELDS = ["name"];
