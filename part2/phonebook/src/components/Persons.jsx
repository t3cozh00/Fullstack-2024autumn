import React from "react";

export default function Persons({ personsToShow, deleteButton }) {
  return (
    <div>
      <ul>
        {personsToShow.map((person) => (
          <li style={{ listStyleType: "none" }} key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => deleteButton(person.id, person.name)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
