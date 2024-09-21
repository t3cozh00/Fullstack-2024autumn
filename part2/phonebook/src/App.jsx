import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterLetter, setFilterLetter] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterLetter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    //console.log("button clicked", event.target);
    if (persons.some((person) => person.name === newName)) {
      // checks if there is any person in the persons array that exactly matches newName.
      alert(`${newName} is already added to phonebook`);
      // use a template string
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  // Filter the list of persons based on the search term
  const personsToShow = filterLetter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterLetter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input value={filterLetter} onChange={handleFilterChange} />
      </div>
      <h3>add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person, i) => (
          <li style={{ listStyleType: "none" }} key={i}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
