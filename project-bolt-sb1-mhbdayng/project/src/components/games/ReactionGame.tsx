import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Zap, Gift, Award } from 'lucide-react';

const ReactionGame = ({ onClose }) => {
  const [gameState, setGameState] = useState('intro'); // intro, waiting, ready, clicked, finished
  const [targets, setTargets] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [currentTargetAppeared, setCurrentTargetAppeared] = useState(0);
  const timerRef = useRef(null);
  const gameAreaRef = useRef(null);
  
  const startGame = () => {
    setGameState('waiting');
    setScore(0);
    setTimeLeft(30);
    setReactionTimes([]);
    setTargets([]);
    
    // Start the countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setGameState('finished');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // Schedule the first target
    scheduleNextTarget();
  };
  
  const scheduleNextTarget = () => {
    // Random delay between 1-3 seconds
    const delay = 1000 + Math.random() * 2000;
    
    setTimeout(() => {
      if (gameState === 'waiting' || gameState === 'ready') {
        createTarget();
      }
    }, delay);
  };
  
  const createTarget = () => {
    if (gameAreaRef.current) {
      const gameArea = gameAreaRef.current.getBoundingClientRect();
      const size = 50 + Math.random() * 30; // Random size between 50-80px
      
      // Calculate position ensuring the target is fully visible
      const maxX = gameArea.width - size;
      const maxY = gameArea.height - size;
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      
      const newTarget = {
        id: Date.now(),
        x,
        y,
        size,
        appeared: Date.now()
      };
      
      setTargets([newTarget]);
      setCurrentTargetAppeared(Date.now());
      setGameState('ready');
    }
  };
  
  const handleTargetClick = (targetId) => {
    const now = Date.now();
    const reactionTime = now - currentTargetAppeared;
    
    setReactionTimes(prev => [...prev, reactionTime]);
    setScore(prevScore => prevScore + 1);
    setTargets([]);
    setGameState('waiting');
    
    // Schedule the next target
    scheduleNextTarget();
  };
  
  const getAverageReactionTime = () => {
    if (reactionTimes.length === 0) return 0;
    const sum = reactionTimes.reduce((acc, time) => acc + time, 0);
    return Math.round(sum / reactionTimes.length);
  };
  
  const getBestReactionTime = () => {
    if (reactionTimes.length === 0) return 0;
    return Math.min(...reactionTimes);
  };
  
  const getScoreRating = () => {
    if (score >= 20) return "Lightning Fast! ⚡⚡⚡";
    if (score >= 15) return "Super Quick! ⚡⚡";
    if (score >= 10) return "Pretty Fast! ⚡";
    if (score >= 5) return "Good Job!";
    return "Keep Practicing!";
  };
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
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
        <div className="inline-flex items-center justify-center p-3 bg-yellow-500 rounded-full mb-4 text-white">
          <Zap className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Reaction Time Challenge</h2>
        <p className="text-gray-600 mt-2">Test your reflexes to unlock your gift!</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {gameState === 'intro' && (
          <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">How to Play</h3>
            <p className="text-gray-600 mb-6">
              Tap or click on the targets as quickly as possible when they appear. The faster your reactions, the higher your score!
            </p>
            <div className="flex justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center text-white">
                <Zap className="w-8 h-8" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white">
                <Zap className="w-6 h-6" />
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white">
                <Zap className="w-10 h-10" />
              </div>
            </div>
            <button 
              onClick={startGame}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-medium text-white"
            >
              Start Game
            </button>
          </div>
        )}
        
        {(gameState === 'waiting' || gameState === 'ready') && (
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200 text-gray-700">
                <span className="text-sm font-medium">Score: {score}</span>
              </div>
              <div className="bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200 text-gray-700">
                <span className="text-sm font-medium">Time: {timeLeft}s</span>
              </div>
            </div>
            
            <div 
              ref={gameAreaRef}
              className="bg-white rounded-xl h-96 relative overflow-hidden shadow-lg border border-gray-200"
            >
              {targets.map(target => (
                <motion.div
                  key={target.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: target.x,
                    top: target.y,
                    width: target.size,
                    height: target.size
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleTargetClick(target.id)}
                >
                  <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
                    <Zap className="w-1/2 h-1/2 text-white" />
                  </div>
                </motion.div>
              ))}
              
              {gameState === 'waiting' && targets.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">Get ready... Target will appear soon!</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 text-center text-gray-600 text-sm">
              <p>Click on the targets as fast as you can!</p>
              <p>Your average reaction time: {getAverageReactionTime()}ms</p>
            </div>
          </div>
        )}
        
        {gameState === 'finished' && (
          <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-gray-200">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <Award className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Time's Up!</h3>
            <p className="text-gray-600 mb-6">You've completed the reaction challenge!</p>
            
            <div className="bg-gray-100 rounded-lg p-4 mb-6 border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Targets Hit</p>
                  <p className="text-3xl font-bold text-gray-800">{score}</p>
                  <p className="text-sm text-yellow-500 mt-1">{getScoreRating()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reaction Times</p>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Avg:</span>
                      <span className="text-xl font-bold text-gray-800">{getAverageReactionTime()}ms</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Best:</span>
                      <span className="text-lg font-bold text-green-600">{getBestReactionTime()}ms</span>
                    </div>
                  </div>
                </div>
              </div>
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
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-medium text-white"
              >
                Continue to Gift
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ReactionGame;