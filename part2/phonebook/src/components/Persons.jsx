import React from "react";

export default function Persons({ personsToShow }) {
  return (
    <div>
      <ul>
        {personsToShow.map((person, i) => (
          <li style={{ listStyleType: "none" }} key={i}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
}
