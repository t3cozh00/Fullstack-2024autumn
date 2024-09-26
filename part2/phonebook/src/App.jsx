import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterLetter, setFilterLetter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  }, []);

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
    console.log("Adding person:", { newName, newNumber });
    //console.log("button clicked", event.target);
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      console.log("Existing person found:", existingPerson);
      if (existingPerson.number === newNumber) {
        alert(`${newName} is already added to phonebook`);
        // use a template string
      } else {
        updateInfo(existingPerson.id, newName);
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const updateInfo = (id, name) => {
    const person = persons.find((p) => p.name === name);
    const changedPerson = { ...person, number: newNumber };
    console.log("Updating person:", changedPerson);

    if (
      window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personService.update(id, changedPerson).then((returnedPerson) => {
        console.log("Updated person:", returnedPerson);
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        );
        setNewName(""); // Reset input fields
        setNewNumber("");
      });
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
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deleteButton={deletePerson} />
    </div>
  );
};

export default App;
