import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);
  //const [voteNum, setVoteNum] = useState(0);
  const [voteNum, setVoteNum] = useState(Array(anecdotes.length).fill(0));

  const getRandom = () => {
    const randomAnecdoteIndex = Math.floor(Math.random() * anecdotes.length);
    //console.log("Random anecdote index:", randomAnecdoteIndex);
    setSelected(randomAnecdoteIndex);
  };
  //console.log(getRandom()); (wrong)

  // Function to increment vote count for a specific item
  const voteAnecdote = (index) => {
    const newVotes = [...voteNum];
    newVotes[index] += 1;
    setVoteNum(newVotes);
  };

  // Find the index of the anecdote with the most votes
  //If multiple anecdotes are tied for the most votes, it will display the first one found
  const maxVotesIndex = voteNum.indexOf(Math.max(...voteNum));

  return (
    <>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      {/* Display the vote count for the selected anecdote */}
      <p>has {voteNum[selected]} votes</p>
      <button onClick={() => voteAnecdote(selected)}>vote</button>
      <button onClick={getRandom}>next anecdote</button>
      <h3>Anecdote with most votes</h3>
      <p>{anecdotes[maxVotesIndex]}</p>
      <p>has {voteNum[maxVotesIndex]} vote</p>
    </>
  );
};

export default App;
