import { useState } from "react";
//import "./App.css";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistics = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const getGood = (newGoodValue) => {
    //console.log("goodvalue", newGoodValue);
    setGood(newGoodValue);
  };
  const getNeutral = (newNeutralValue) => {
    setNeutral(newNeutralValue);
  };
  const getBad = (newBadValue) => {
    setBad(newBadValue);
  };

  const allValue = good + neutral + bad;
  const averageValue = (good * 1 + bad * -1) / allValue;
  const positivePercentage = ((good / allValue) * 100).toFixed(1);

  // display statistcs content when give feedback or not
  let statisticsContent;
  if (allValue === 0) {
    statisticsContent = <p>No feedback given</p>;
  } else {
    statisticsContent = (
      <>
        <table>
          <tbody>
            <Statistics text="good" value={good} />
            <Statistics text="neutral" value={neutral} />
            <Statistics text="bad" value={bad} />
            <tr>
              <td>all</td>
              <td>{allValue}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{averageValue}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{positivePercentage}%</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => getGood(good + 1)} text="good" />
      <Button handleClick={() => getNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => getBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      {statisticsContent}
    </>
  );
};

export default App;
