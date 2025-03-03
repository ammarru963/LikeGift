import React, { useState, useEffect } from 'react';
import { Gift, Award, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

// Define maze layout
// 0 = path, 1 = wall, 2 = gift, 3 = player
const initialMaze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
  [1, 1, 0, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const MazeOfGifts = ({ onComplete, onProgress }) => {
  const [maze, setMaze] = useState(initialMaze);
  const [playerPosition, setPlayerPosition] = useState({ row: 1, col: 1 });
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    // Find initial player position
    for (let row = 0; row < initialMaze.length; row++) {
      for (let col = 0; col < initialMaze[row].length; col++) {
        if (initialMaze[row][col] === 3) {
          setPlayerPosition({ row, col });
          setPath([{ row, col }]);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    if (gameWon) {
      setShowConfetti(true);
      const pieces = [];
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 10 + 5,
          color: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'][Math.floor(Math.random() * 5)],
          rotation: Math.random() * 360,
          delay: Math.random() * 2
        });
      }
      setConfettiPieces(pieces);
      
      // Complete the game after showing results
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 3000);
    }
  }, [gameWon, onComplete]);

  useEffect(() => {
    // Set up keyboard controls
    const handleKeyDown = (e) => {
      if (gameWon) return;
      
      switch (e.key) {
        case 'ArrowUp':
          movePlayer(-1, 0);
          break;
        case 'ArrowDown':
          movePlayer(1, 0);
          break;
        case 'ArrowLeft':
          movePlayer(0, -1);
          break;
        case 'ArrowRight':
          movePlayer(0, 1);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition, gameWon]);

  const movePlayer = (rowDelta, colDelta) => {
    const newRow = playerPosition.row + rowDelta;
    const newCol = playerPosition.col + colDelta;
    
    // Check if the move is valid
    if (
      newRow >= 0 && 
      newRow < maze.length && 
      newCol >= 0 && 
      newCol < maze[0].length && 
      maze[newRow][newCol] !== 1
    ) {
      // Create a new maze with the player moved
      const newMaze = maze.map(row => [...row]);
      
      // Remove player from old position
      newMaze[playerPosition.row][playerPosition.col] = 0;
      
      // Check if player reached the gift
      if (newMaze[newRow][newCol] === 2) {
        setGameWon(true);
        if (onProgress) onProgress(100);
      }
      
      // Place player in new position
      newMaze[newRow][newCol] = 3;
      
      // Update state
      setMaze(newMaze);
      setPlayerPosition({ row: newRow, col: newCol });
      setMoves(moves + 1);
      setPath([...path, { row: newRow, col: newCol }]);
      
      // Update progress based on distance to gift
      if (onProgress) {
        // Find gift position
        let giftRow = 0, giftCol = 0;
        for (let r = 0; r < maze.length; r++) {
          for (let c = 0; c < maze[r].length; c++) {
            if (maze[r][c] === 2) {
              giftRow = r;
              giftCol = c;
              break;
            }
          }
        }
        
        // Calculate Manhattan distance to gift
        const initialDistance = Math.abs(1 - giftRow) + Math.abs(1 - giftCol);
        const currentDistance = Math.abs(newRow - giftRow) + Math.abs(newCol - giftCol);
        
        // Progress is inversely proportional to distance
        const progress = Math.min(90, (1 - (currentDistance / initialDistance)) * 90);
        onProgress(progress);
      }
    }
  };

  const handleDirectionClick = (rowDelta, colDelta) => {
    if (!gameWon) {
      movePlayer(rowDelta, colDelta);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confettiPieces.map(piece => (
            <div 
              key={piece.id}
              className="absolute animate-float-1"
              style={{
                left: `${piece.x}%`,
                top: `${piece.y}%`,
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                backgroundColor: piece.color,
                transform: `rotate(${piece.rotation}deg)`,
                animationDelay: `${piece.delay}s`
              }}
            ></div>
          ))}
        </div>
      )}
      
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">متاهة الهدايا</h2>
        <p className="text-gray-600">استخدم الأسهم للوصول إلى الهدية</p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <div className="grid grid-cols-10 gap-1 mx-auto" style={{ maxWidth: '300px' }}>
          {maze.map((row, rowIndex) => (
            row.map((cell, colIndex) => {
              // Check if this position is in the path
              const isPath = path.some(pos => pos.row === rowIndex && pos.col === colIndex);
              
              return (
                <div 
                  key={`${rowIndex}-${colIndex}`} 
                  className={`w-7 h-7 flex items-center justify-center rounded-sm ${
                    cell === 1 ? 'bg-gray-800' : 
                    cell === 2 ? 'bg-green-100 border border-green-500' : 
                    cell === 3 ? 'bg-blue-500' : 
                    isPath ? 'bg-blue-100' : 'bg-white border border-gray-200'
                  }`}
                >
                  {cell === 2 && <Gift size={16} className="text-green-600" />}
                  {cell === 3 && <div className="w-3 h-3 rounded-full bg-white"></div>}
                </div>
              );
            })
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mb-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-start-2">
            <button 
              onClick={() => handleDirectionClick(-1, 0)}
              className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700"
            >
              <ArrowUp size={24} />
            </button>
          </div>
          <div>
            <button 
              onClick={() => handleDirectionClick(0, -1)}
              className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          <div>
            <button 
              onClick={() => handleDirectionClick(0, 1)}
              className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700"
            >
              <ArrowRight size={24} />
            </button>
          </div>
          <div className="col-start-2">
            <button 
              onClick={() => handleDirectionClick(1, 0)}
              className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700"
            >
              <ArrowDown size={24} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          الخطوات: {moves}
        </div>
        
        {gameWon && (
          <div className="flex items-center text-green-600">
            <Award size={20} className="mr-1" />
            <span className="font-medium">مبروك! لقد وجدت الهدية!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MazeOfGifts;