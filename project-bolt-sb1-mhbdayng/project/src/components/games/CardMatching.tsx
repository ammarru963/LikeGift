import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Puzzle, Gift, Clock, Trophy } from 'lucide-react';

const CardMatching = ({ onClose }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [time, setTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  
  const cardIcons = [
    { icon: '🎁', name: 'gift' },
    { icon: '🎂', name: 'cake' },
    { icon: '🎈', name: 'balloon' },
    { icon: '🎊', name: 'confetti' },
    { icon: '🎉', name: 'party' },
    { icon: '🎀', name: 'ribbon' },
    { icon: '🎵', name: 'music' },
    { icon: '🎮', name: 'game' },
  ];
  
  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = [...cardIcons, ...cardIcons];
    
    // Shuffle the cards
    const shuffledCards = cardPairs
      .map(card => ({ ...card, id: Math.random() }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setTime(0);
    setGameStarted(true);
    setGameCompleted(false);
    
    // Start the timer
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    
    setTimerInterval(interval);
  };
  
  const handleCardClick = (index) => {
    // Ignore if the card is already flipped or matched
    if (flippedIndices.includes(index) || matchedPairs.includes(cards[index].name)) {
      return;
    }
    
    // Ignore if two cards are already flipped
    if (flippedIndices.length === 2) {
      return;
    }
    
    // Flip the card
    setFlippedIndices(prevIndices => [...prevIndices, index]);
  };
  
  useEffect(() => {
    // Check for matches when two cards are flipped
    if (flippedIndices.length === 2) {
      setMoves(prevMoves => prevMoves + 1);
      
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];
      
      if (firstCard.name === secondCard.name) {
        // Match found
        setMatchedPairs(prevMatched => [...prevMatched, firstCard.name]);
        setFlippedIndices([]);
      } else {
        // No match, flip back after a delay
        const timer = setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [flippedIndices, cards]);
  
  useEffect(() => {
    // Check if all pairs are matched
    if (gameStarted && matchedPairs.length === cardIcons.length) {
      setGameCompleted(true);
      clearInterval(timerInterval);
    }
  }, [matchedPairs, gameStarted, cardIcons.length, timerInterval]);
  
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);
  
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
        <div className="inline-flex items-center justify-center p-3 bg-pink-500 rounded-full mb-4 text-white">
          <Puzzle className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Card Matching Challenge</h2>
        <p className="text-gray-600 mt-2">Find all matching pairs to reveal your gift!</p>
      </div>
      
      <div className="max-w-lg mx-auto">
        {!gameStarted ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">How to Play</h3>
            <p className="text-gray-600 mb-6">
              Flip cards to find matching pairs. Remember the positions and match all pairs to win!
            </p>
            <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
                  {i === 1 || i === 2 ? '🎁' : '?'}
                </div>
              ))}
            </div>
            <button 
              onClick={initializeGame}
              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-medium text-white"
            >
              Start Game
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="bg-white px-3 py-1 rounded-lg flex items-center shadow-sm text-gray-700">
                <Clock className="w-4 h-4 mr-1 text-pink-500" />
                <span className="text-sm font-medium">Time: {formatTime(time)}</span>
              </div>
              <div className="bg-white px-3 py-1 rounded-lg shadow-sm text-gray-700">
                <span className="text-sm font-medium">Moves: {moves}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3 mb-6">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  className={`
                    aspect-square rounded-lg cursor-pointer shadow-md
                    ${flippedIndices.includes(index) || matchedPairs.includes(card.name)
                      ? 'bg-gradient-to-br from-pink-500 to-purple-600'
                      : 'bg-white hover:bg-gray-50 border border-gray-200'}
                  `}
                  initial={{ rotateY: 0 }}
                  animate={{ 
                    rotateY: flippedIndices.includes(index) || matchedPairs.includes(card.name) ? 180 : 0,
                    scale: matchedPairs.includes(card.name) ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    {flippedIndices.includes(index) || matchedPairs.includes(card.name)
                      ? card.icon
                      : '?'}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center text-gray-600 text-sm">
              <p>Click on cards to flip them and find matching pairs</p>
              <p>Match all pairs to win!</p>
            </div>
            
            {/* Game completed overlay */}
            {gameCompleted && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20">
                <div className="bg-white rounded-xl p-8 max-w-md text-center shadow-xl">
                  <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                    <Trophy className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">All Pairs Matched!</h3>
                  <p className="text-gray-600 mb-6">You've unlocked your gift!</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
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
                  </div>
                  
                  <div className="space-x-4">
                    <button 
                      onClick={initializeGame}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white"
                    >
                      Play Again
                    </button>
                    <button 
                      onClick={onClose}
                      className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg font-medium text-white"
                    >
                      Continue to Gift
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default CardMatching;