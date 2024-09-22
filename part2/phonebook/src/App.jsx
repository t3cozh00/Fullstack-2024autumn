import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
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
      <Filter filterLetter={filterLetter} handleFilter={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      {/* <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> */}
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
      {/* <ul>
        {personsToShow.map((person, i) => (
          <li style={{ listStyleType: "none" }} key={i}>
            {person.name} {person.number}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default App;
