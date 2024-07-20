import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [matchResult, setMatchResult] = useState(null);
  const [turn, setTurn] = useState(null);

  const WINNING_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [position1, position2, position3] = WINNING_PATTERNS[i];
      if (
        currentBoard[position1] &&
        currentBoard[position1] === currentBoard[position2] &&
        currentBoard[position1] === currentBoard[position3]
      ) {
        return currentBoard[position1];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setMatchResult("Player " + winner + " wins!");
      setTurn("Game Over");
    } else if (!board.includes(null)) {
      setMatchResult("It's a draw");
      setTurn("Game Over");
    } else {
      setTurn("Player " + (isXNext ? "X" : "O") + " turn");
    }
  }, [board, matchResult]);

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setMatchResult(null);
  };

  return (
    <div className="container">
      <h1 className="title">TIC TAC TOE</h1>
      {matchResult ? (
        <div className="win">
          <div className="win-text">{matchResult}</div>
          <button className="resetBtn" onClick={handleReset}> Play Again </button>
        </div>
      ) : null}
      <div className="board">
        {board.map((value, index) => {
          return (
            <button key={index} className="btn" onClick={() => handleClick(index)}>
              {value}
            </button>
          );
        })}
      </div>

      <div className="status-sec">{turn}</div>
    </div>
  );
};

export default App;
