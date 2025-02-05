import { useState, useEffect } from 'react'
import './App.css'

const COLORS = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#FFA500', '#800080', '#008000', '#FFC0CB', '#A52A2A', '#808080'
];

function App() {
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const generateRandomColors = () => {
    const shuffled = [...COLORS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);
    const target = selected[Math.floor(Math.random() * selected.length)];
    setTargetColor(target);
    setOptions(selected);
    setGameStatus('');
    setIsCorrect(null);
  };

  useEffect(() => {
    generateRandomColors();
  }, []);

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setGameStatus('Correct! Well done!');
      setIsCorrect(true);
      setTimeout(generateRandomColors, 1500);
    } else {
      setGameStatus('Wrong! Try again!');
      setIsCorrect(false);
    }
  };

  const startNewGame = () => {
    setScore(0);
    generateRandomColors();
  };

  return (
    <div className="game-container">
      <h1>Color Guessing Game</h1>
      
      <p data-testid="gameInstructions" className="instructions">
        Can you guess which color matches the box below?
      </p>
      
      <div 
        data-testid="colorBox" 
        className="color-box"
        style={{ backgroundColor: targetColor }}
      ></div>

      <p data-testid="score" className="score">
        Score: {score}
      </p>

      <div 
        data-testid="gameStatus" 
        className={`game-status ${isCorrect === true ? 'correct' : ''} ${isCorrect === false ? 'wrong' : ''} `}
      >
        {gameStatus}
      </div>

      <div className="color-options">
        {options.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            className="color-button"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          ></button>
        ))}
      </div>

      <button 
        data-testid="newGameButton"
        className="new-game-button"
        onClick={startNewGame}
      >
        New Game
      </button>
    </div>
  );
}

export default App;