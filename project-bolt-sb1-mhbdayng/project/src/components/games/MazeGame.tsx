import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Gift, Trophy } from 'lucide-react';

const MazeGame = ({ onClose }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [bestTime, setBestTime] = useState(null);
  const timerRef = useRef(null);
  
  // Simple maze layout (0 = wall, 1 = path, 2 = start, 3 = end)
  const maze = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  
  const CELL_SIZE = 30;
  const MAZE_WIDTH = maze[0].length * CELL_SIZE;
  const MAZE_HEIGHT = maze.length * CELL_SIZE;
  
  const startGame = () => {
    setGameStarted(true);
    setGameCompleted(false);
    setPlayerPosition({ x: 1, y: 1 });
    setMoves(0);
    setTime(0);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  };
  
  const handleKeyDown = (e) => {
    if (!gameStarted || gameCompleted) return;
    
    let newPosition = { ...playerPosition };
    
    switch (e.key) {
      case 'ArrowUp':
        newPosition.y -= 1;
        break;
      case 'ArrowDown':
        newPosition.y += 1;
        break;
      case 'ArrowLeft':
        newPosition.x -= 1;
        break;
      case 'ArrowRight':
        newPosition.x += 1;
        break;
      default:
        return;
    }
    
    // Check if the new position is valid
    if (
      newPosition.y >= 0 &&
      newPosition.y < maze.length &&
      newPosition.x >= 0 &&
      newPosition.x < maze[0].length &&
      maze[newPosition.y][newPosition.x] !== 0
    ) {
      setPlayerPosition(newPosition);
      setMoves(prevMoves => prevMoves + 1);
      
      // Check if player reached the end
      if (maze[newPosition.y][newPosition.x] === 3) {
        completeGame();
      }
    }
  };
  
  const handleMoveButton = (direction) => {
    if (!gameStarted || gameCompleted) return;
    
    let newPosition = { ...playerPosition };
    
    switch (direction) {
      case 'up':
        newPosition.y -= 1;
        break;
      case 'down':
        newPosition.y += 1;
        break;
      case 'left':
        newPosition.x -= 1;
        break;
      case 'right':
        newPosition.x += 1;
        break;
      default:
        return;
    }
    
    // Check if the new position is valid
    if (
      newPosition.y >= 0 &&
      newPosition.y < maze.length &&
      newPosition.x >= 0 &&
      newPosition.x < maze[0].length &&
      maze[newPosition.y][newPosition.x] !== 0
    ) {
      setPlayerPosition(newPosition);
      setMoves(prevMoves => prevMoves + 1);
      
      // Check if player reached the end
      if (maze[newPosition.y][newPosition.x] === 3) {
        completeGame();
      }
    }
  };
  
  const completeGame = () => {
    setGameCompleted(true);
    clearInterval(timerRef.current);
    
    if (bestTime === null || time < bestTime) {
      setBestTime(time);
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(timerRef.current);
    };
  }, [playerPosition, gameStarted, gameCompleted]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative bg-white text-gray-800 p-6 rounded-xl"
    >
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={onClose}
          className="p-2 bg-white hover:bg-gray-100 rounded-full shadow-md text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-full mb-4 text-white">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
            <line x1="15" y1="3" x2="15" y2="21"></line>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="3" y1="15" x2="21" y2="15"></line>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Maze of Gifts</h2>
        <p className="text-gray-600 mt-2">Navigate through the maze to find your gift!</p>
      </div>
      
      <div className="max-w-lg mx-auto">
        {gameStarted ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm">
                <span className="text-sm font-medium text-gray-700">Moves: {moves}</span>
              </div>
              <div className="bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm">
                <span className="text-sm font-medium text-gray-700">Time: {formatTime(time)}</span>
              </div>
            </div>
            
            <div 
              className="relative bg-white rounded-xl overflow-hidden mx-auto border border-gray-200 shadow-md"
              style={{ width: MAZE_WIDTH, height: MAZE_HEIGHT }}
            >
              {/* Render maze */}
              {maze.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        ${cell === 0 ? 'bg-gray-800' : 'bg-gray-100'}
                        ${cell === 2 ? 'bg-blue-600' : ''}
                        ${cell === 3 ? 'bg-green-600' : ''}
                      `}
                      style={{ width: CELL_SIZE, height: CELL_SIZE }}
                    >
                      {cell === 3 && (
                        <div className="w-full h-full flex items-center justify-center">
                          <Gift className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              
              {/* Player */}
              <div
                className="absolute bg-orange-500 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  width: CELL_SIZE - 8,
                  height: CELL_SIZE - 8,
                  left: playerPosition.x * CELL_SIZE + 4,
                  top: playerPosition.y * CELL_SIZE + 4,
                }}
              >
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            
            {/* Mobile controls */}
            <div className="mt-6 grid grid-cols-3 gap-2 max-w-xs mx-auto">
              <div></div>
              <button
                onClick={() => handleMoveButton('up')}
                className="p-3 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
              </button>
              <div></div>
              
              <button
                onClick={() => handleMoveButton('left')}
                className="p-3 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              
              <button
                onClick={() => handleMoveButton('down')}
                className="p-3 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <button
                onClick={() => handleMoveButton('right')}
                className="p-3 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            
            <div className="text-center mt-4 text-gray-600 text-sm">
              <p>Use arrow keys or buttons to navigate the maze</p>
              <p>Find the gift at the end of the maze!</p>
            </div>
            
            {/* Game completed overlay */}
            {gameCompleted && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20">
                <div className="bg-white rounded-xl p-8 max-w-md text-center shadow-xl">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                    <Trophy className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">Maze Completed!</h3>
                  <p className="text-gray-600 mb-6">You found the gift!</p>
                  
                  <div className="bg-gray-100 rounded-lg p-4 mb-6 border border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Moves</p>
                        <p className="text-xl font-bold text-gray-800">{moves}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="text-xl font-bold text-gray-800">{formatTime(time)}</p>
                      </div>
                    </div>
                    
                    {bestTime !== null && (
                      <div className="mt-4 pt-4 border-t border-gray-300">
                        <p className="text-sm text-gray-500">Best Time</p>
                        <p className="text-lg font-bold text-green-600">{formatTime(bestTime)}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-x-4">
                    <button 
                      onClick={startGame}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white"
                    >
                      Play Again
                    </button>
                    <button 
                      onClick={onClose}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium text-white"
                    >
                      Continue to Gift
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">How to Play</h3>
            <p className="text-gray-600 mb-6">
              Navigate through the maze to find the gift at the end. Use arrow keys or the on-screen buttons to move.
            </p>
            <div className="flex justify-center mb-6">
              <div className="grid grid-cols-3 gap-2 w-32">
                <div></div>
                <div className="p-2 bg-gray-200 rounded-lg flex items-center justify-center text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                </div>
                <div></div>
                
                <div className="p-2 bg-gray-200 rounded-lg flex items-center justify-center text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </div>
                
                <div className="p-2 bg-gray-200 rounded-lg flex items-center justify-center text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                
                <div className="p-2 bg-gray-200 rounded-lg flex items-center justify-center text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
            <button 
              onClick={startGame}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium text-white"
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MazeGame;

export default MazeGame