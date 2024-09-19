import React from "react";

export default function Total({ parts }) {
  //   const sum = exercisesObj.reduce(
  //     (accumulator, currentValue) => accumulator + currentValue.exercises,
  //     0
  //   );
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  console.log("totalExercises", totalExercises);

  return (
    <div>
      <h4>total of {totalExercises} exercises</h4>
    </div>
  );
}
