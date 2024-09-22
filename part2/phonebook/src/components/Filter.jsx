import React from "react";

export default function Filter({ filterLetter, handleFilter }) {
  return (
    <div>
      filter shown with <input value={filterLetter} onChange={handleFilter} />
    </div>
  );
}
