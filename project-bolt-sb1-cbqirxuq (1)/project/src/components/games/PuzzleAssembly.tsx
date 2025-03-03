import React, { useState, useEffect } from 'react';
import { Gift, Clock, Award, RefreshCw } from 'lucide-react';

const PuzzleAssembly = ({ onComplete, onProgress }) => {
  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [placedPieces, setPlacedPieces] = useState([]);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState('medium'); // easy, medium, hard
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  
  // Define puzzle image and grid size based on difficulty
  const puzzleImage = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80';
  const gridSize = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  const totalPieces = gridSize * gridSize;
  
  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameCompleted]);
  
  useEffect(() => {
    if (gameCompleted) {
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
  }, [gameCompleted, onComplete]);
  
  useEffect(() => {
    // Check if all pieces are placed
    if (placedPieces.length === totalPieces && gameStarted) {
      setGameCompleted(true);
      if (onProgress) onProgress(100);
    }
  }, [placedPieces, totalPieces, gameStarted, onProgress]);
  
  const initializeGame = () => {
    // Create puzzle pieces
    const newPieces = [];
    for (let i = 0; i < totalPieces; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      
      newPieces.push({
        id: i,
        correctPosition: i,
        row,
        col,
        backgroundPosition: `${-col * (100 / (gridSize - 1))}% ${-row * (100 / (gridSize - 1))}%`
      });
    }
    
    // Shuffle pieces
    const shuffledPieces = [...newPieces].sort(() => Math.random() - 0.5);
    
    setPieces(shuffledPieces);
    setPlacedPieces([]);
    setSelectedPiece(null);
    setTimer(0);
    setGameCompleted(false);
    setGameStarted(true);
  };
  
  const handlePieceSelect = (piece) => {
    // Can't select already placed pieces
    if (placedPieces.includes(piece.id)) return;
    
    setSelectedPiece(piece);
  };
  
  const handleSlotSelect = (slotIndex) => {
    if (!selectedPiece) return;
    
    // Check if slot is already filled
    if (placedPieces.includes(slotIndex)) return;
    
    // Place the piece
    const newPlacedPieces = [...placedPieces, slotIndex];
    setPlacedPieces(newPlacedPieces);
    
    // Remove piece from selection
    setSelectedPiece(null);
    
    // Update progress
    if (onProgress) {
      const progressIncrement = 100 / totalPieces;
      onProgress(progressIncrement);
    }
  };
  
  const isPieceCorrectlyPlaced = (pieceId, slotIndex) => {
    const piece = pieces.find(p => p.id === pieceId);
    return piece && piece.correctPosition === slotIndex;
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getAvailablePieces = () => {
    return pieces.filter(piece => !placedPieces.includes(piece.id));
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
        <h2 className="text-xl font-bold text-gray-800">لعبة تركيب الصور</h2>
        <p className="text-gray-600">رتب القطع لتكوين الصورة الكاملة!</p>
      </div>
      
      {!gameStarted ? (
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <Gift size={48} className="text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-blue-800 mb-4">اختر مستوى الصعوبة:</h3>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            {['easy', 'medium', 'hard'].map((level) => (
              <button
                key={level}
                className={`py-2 rounded-lg text-sm font-medium capitalize ${
                  difficulty === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setDifficulty(level)}
              >
                {level === 'easy' ? 'سهل' : level === 'medium' ? 'متوسط' : 'صعب'}
              </button>
            ))}
          </div>
          
          <button
            onClick={initializeGame}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            ابدأ اللعبة
          </button>
        </div>
      ) : !gameCompleted ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
              <Clock size={16} className="text-blue-600 mr-1" />
              <span className="text-blue-800 font-medium">{formatTime(timer)}</span>
            </div>
            
            <div className="bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-blue-800 font-medium">
                {placedPieces.length} / {totalPieces} قطعة
              </span>
            </div>
          </div>
          
          {/* Puzzle board */}
          <div className="mb-6">
            <div 
              className="grid gap-1 mx-auto bg-gray-200 p-1 rounded-lg"
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                width: '300px',
                height: '300px'
              }}
            >
              {Array.from({ length: totalPieces }).map((_, slotIndex) => {
                const placedPieceId = placedPieces.includes(slotIndex) ? 
                  pieces.find(p => p.id === placedPieces[placedPieces.indexOf(slotIndex)])?.id : null;
                
                return (
                  <div
                    key={slotIndex}
                    className={`relative border ${
                      placedPieceId !== null
                        ? isPieceCorrectlyPlaced(placedPieceId, slotIndex)
                          ? 'border-green-500'
                          : 'border-red-500'
                        : selectedPiece
                          ? 'border-blue-500 bg-blue-100 cursor-pointer'
                          : 'border-gray-300 bg-gray-100'
                    }`}
                    onClick={() => handleSlotSelect(slotIndex)}
                  >
                    {placedPieceId !== null && (
                      <div 
                        className="absolute inset-0 bg-cover bg-no-repeat"
                        style={{ 
                          backgroundImage: `url(${puzzleImage})`,
                          backgroundSize: `${gridSize * 100}%`,
                          backgroundPosition: pieces.find(p => p.id === placedPieceId)?.backgroundPosition
                        }}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Available pieces */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">القطع المتاحة:</h3>
            <div 
              className="grid gap-2 mx-auto"
              style={{ 
                gridTemplateColumns: `repeat(${Math.min(5, gridSize)}, 1fr)`,
              }}
            >
              {getAvailablePieces().map((piece) => (
                <div
                  key={piece.id}
                  className={`aspect-square border cursor-pointer ${
                    selectedPiece?.id === piece.id
                      ? 'border-2 border-blue-500 shadow-md'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                  onClick={() => handlePieceSelect(piece)}
                >
                  <div 
                    className="w-full h-full bg-cover bg-no-repeat"
                    style={{ 
                      backgroundImage: `url(${puzzleImage})`,
                      backgroundSize: `${gridSize * 100}%`,
                      backgroundPosition: piece.backgroundPosition
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <Award size={48} className="text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">مبروك!</h3>
          <p className="text-green-700 mb-4">
            لقد أكملت اللغز في {formatTime(timer)}!
          </p>
          <div className="w-48 h-48 mx-auto rounded-lg overflow-hidden mb-4">
            <img 
              src={puzzleImage}
              alt="Completed Puzzle" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-green-700">
            ستظهر بطاقة الهدية الخاصة بك الآن!
          </p>
        </div>
      )}
    </div>
  );
};

export default PuzzleAssembly;