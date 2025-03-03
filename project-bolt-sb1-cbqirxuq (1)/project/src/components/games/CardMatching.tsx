import React, { useState, useEffect } from 'react';
import { Gift, Clock, Award } from 'lucide-react';

const CardMatching = ({ onComplete, onProgress }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  
  const cardSymbols = ['🎁', '🎂', '🎈', '🎉', '🎊', '💝', '🎀', '🎄'];
  
  useEffect(() => {
    initializeGame();
  }, []);
  
  useEffect(() => {
    let interval;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, gameCompleted]);
  
  useEffect(() => {
    // Check if two cards are flipped
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      
      // Check if it's a match
      if (cards[firstIndex].symbol === cards[secondIndex].symbol) {
        // Add to matched pairs
        setMatchedPairs(prev => [...prev, cards[firstIndex].symbol]);
        
        // Update progress
        if (onProgress) {
          const progressIncrement = 100 / cardSymbols.length;
          onProgress(progressIncrement);
        }
        
        // Reset flipped indices
        setFlippedIndices([]);
      } else {
        // Not a match, flip back after a delay
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
      
      // Increment moves
      setMoves(prev => prev + 1);
    }
  }, [flippedIndices, cards, onProgress]);
  
  useEffect(() => {
    // Check if all pairs are matched
    if (matchedPairs.length === cardSymbols.length && gameStarted) {
      setGameCompleted(true);
      setShowConfetti(true);
      
      // Generate confetti
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
  }, [matchedPairs, gameStarted, onComplete]);
  
  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = [...cardSymbols, ...cardSymbols].map((symbol, index) => ({
      id: index,
      symbol,
      flipped: false,
      matched: false
    }));
    
    // Shuffle cards
    const shuffledCards = [...cardPairs].sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setTimer(0);
    setGameCompleted(false);
  };
  
  const handleCardClick = (index) => {
    // Start game on first card click
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    // Ignore if game is completed or card is already flipped or matched
    if (
      gameCompleted || 
      flippedIndices.includes(index) || 
      matchedPairs.includes(cards[index].symbol) ||
      flippedIndices.length >= 2
    ) {
      return;
    }
    
    // Flip the card
    setFlippedIndices(prev => [...prev, index]);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const restartGame = () => {
    initializeGame();
    setGameStarted(false);
    setShowConfetti(false);
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
        <h2 className="text-xl font-bold text-gray-800">لعبة مطابقة البطاقات</h2>
        <p className="text-gray-600">اعثر على جميع الأزواج المتطابقة</p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
          <Clock size={16} className="text-blue-600 mr-1" />
          <span className="text-blue-800 font-medium">{formatTime(timer)}</span>
        </div>
        
        <div className="bg-blue-100 px-3 py-1 rounded-full">
          <span className="text-blue-800 font-medium">الحركات: {moves}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 transform ${
              flippedIndices.includes(index) || matchedPairs.includes(card.symbol)
                ? 'rotate-y-180'
                : ''
            } ${
              matchedPairs.includes(card.symbol)
                ? 'bg-green-100 border-2 border-green-400'
                : flippedIndices.includes(index)
                  ? 'bg-blue-100 border-2 border-blue-400'
                  : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={() => handleCardClick(index)}
          >
            <div className="w-full h-full flex items-center justify-center">
              {(flippedIndices.includes(index) || matchedPairs.includes(card.symbol)) ? (
                <span className="text-2xl">{card.symbol}</span>
              ) : (
                <Gift size={24} className="text-white" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      {gameCompleted && (
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <Award size={32} className="text-green-600 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-green-800 mb-1">مبروك!</h3>
          <p className="text-green-700">
            لقد أكملت اللعبة في {formatTime(timer)} مع {moves} حركة!
          </p>
          <button
            onClick={restartGame}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
          >
            العب مرة أخرى
          </button>
        </div>
      )}
    </div>
  );
};

export default CardMatching;