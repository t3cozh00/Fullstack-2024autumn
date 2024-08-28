const Header = (props) => {
  return <div>{props.course}</div>;
};

const Part = (props) => {
  return (
    <div>
      {props.part} {props.exercises}
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part
        part={props.partsAarray[0].name}
        exercises={props.partsAarray[0].exercises}
      />
      <Part
        part={props.partsAarray[1].name}
        exercises={props.partsAarray[1].exercises}
      />
      <Part
        part={props.partsAarray[2].name}
        exercises={props.partsAarray[2].exercises}
      />
    </div>
  );
};

const Total = (props) => {
  const totalExercise =
    props.partsAarray[0].exercises +
    props.partsAarray[1].exercises +
    props.partsAarray[2].exercises;
  return (
    <div>
      <p>Number of exercises {totalExercise}</p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content partsAarray={parts} />
      <Total partsAarray={parts} />
    </div>
  );
};

export default App;
