import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Gift, Award } from 'lucide-react';

const FlappyBird = ({ onClose }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [birdPosition, setBirdPosition] = useState(250);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const gameAreaRef = useRef(null);
  const requestRef = useRef(null);
  const lastTimeRef = useRef(0);
  const obstacleSpeedRef = useRef(3);
  
  const GRAVITY = 0.5;
  const JUMP_FORCE = -10;
  const BIRD_SIZE = 40;
  const OBSTACLE_WIDTH = 60;
  const GAP_SIZE = 150;
  const GAME_WIDTH = 400;
  const GAME_HEIGHT = 500;
  
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setBirdPosition(250);
    setBirdVelocity(0);
    setObstacles([]);
    obstacleSpeedRef.current = 3;
    lastTimeRef.current = 0;
    requestRef.current = requestAnimationFrame(updateGameArea);
  };
  
  const endGame = () => {
    cancelAnimationFrame(requestRef.current);
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
    }
  };
  
  const jump = () => {
    if (!gameStarted) {
      startGame();
    } else if (!gameOver) {
      setBirdVelocity(JUMP_FORCE);
    }
  };
  
  const updateGameArea = (time) => {
    if (lastTimeRef.current === 0) {
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(updateGameArea);
      return;
    }
    
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    
    // Update bird position
    setBirdPosition((prevPosition) => {
      const newPosition = prevPosition + birdVelocity;
      
      // Check if bird hits the ground or ceiling
      if (newPosition >= GAME_HEIGHT - BIRD_SIZE || newPosition <= 0) {
        endGame();
        return prevPosition;
      }
      
      return newPosition;
    });
    
    // Update bird velocity (gravity)
    setBirdVelocity((prevVelocity) => prevVelocity + GRAVITY);
    
    // Update obstacles
    setObstacles((prevObstacles) => {
      // Move obstacles
      const updatedObstacles = prevObstacles.map((obstacle) => ({
        ...obstacle,
        x: obstacle.x - obstacleSpeedRef.current,
      }));
      
      // Remove obstacles that are off-screen
      const filteredObstacles = updatedObstacles.filter((obstacle) => obstacle.x > -OBSTACLE_WIDTH);
      
      // Add new obstacle if needed
      if (filteredObstacles.length === 0 || filteredObstacles[filteredObstacles.length - 1].x < GAME_WIDTH - 200) {
        const gapPosition = Math.floor(Math.random() * (GAME_HEIGHT - GAP_SIZE));
        filteredObstacles.push({
          x: GAME_WIDTH,
          gapTop: gapPosition,
          gapBottom: gapPosition + GAP_SIZE,
          passed: false,
        });
      }
      
      return filteredObstacles;
    });
    
    // Check for collisions and update score
    setObstacles((prevObstacles) => {
      return prevObstacles.map((obstacle) => {
        // Check if bird passed the obstacle
        if (!obstacle.passed && obstacle.x + OBSTACLE_WIDTH < BIRD_SIZE) {
          setScore((prevScore) => {
            const newScore = prevScore + 1;
            // Increase speed every 5 points
            if (newScore % 5 === 0) {
              obstacleSpeedRef.current += 0.5;
            }
            return newScore;
          });
          return { ...obstacle, passed: true };
        }
        
        // Check for collision
        const birdRight = BIRD_SIZE + 50;
        const birdLeft = 50;
        const birdTop = birdPosition;
        const birdBottom = birdPosition + BIRD_SIZE;
        
        const obstacleLeft = obstacle.x;
        const obstacleRight = obstacle.x + OBSTACLE_WIDTH;
        
        if (
          birdRight > obstacleLeft &&
          birdLeft < obstacleRight &&
          (birdTop < obstacle.gapTop || birdBottom > obstacle.gapBottom)
        ) {
          endGame();
        }
        
        return obstacle;
      });
    });
    
    if (!gameOver) {
      requestRef.current = requestAnimationFrame(updateGameArea);
    }
  };
  
  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestRef.current);
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
        <div className="inline-flex items-center justify-center p-3 bg-orange-500 rounded-full mb-4 text-white">
          <Gift className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Gift Card Flappy Bird</h2>
        <p className="text-gray-600 mt-2">Tap to fly and avoid obstacles!</p>
      </div>
      
      <div className="max-w-md mx-auto">
        <div 
          ref={gameAreaRef}
          onClick={jump}
          className="relative bg-gradient-to-b from-blue-400 to-blue-600 rounded-xl overflow-hidden cursor-pointer"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT, margin: '0 auto' }}
        >
          {/* Score display */}
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-full text-white font-bold">
            {score}
          </div>
          
          {/* Bird */}
          <div 
            className="absolute left-12 bg-orange-500 rounded-lg flex items-center justify-center"
            style={{ 
              width: BIRD_SIZE, 
              height: BIRD_SIZE, 
              top: birdPosition,
              transform: `rotate(${birdVelocity * 2}deg)`,
              transition: 'transform 0.1s ease'
            }}
          >
            <Gift className="w-6 h-6 text-white" />
          </div>
          
          {/* Obstacles */}
          {obstacles.map((obstacle, index) => (
            <React.Fragment key={index}>
              {/* Top obstacle */}
              <div 
                className="absolute bg-gradient-to-b from-green-700 to-green-500 border-b-4 border-green-800"
                style={{ 
                  left: obstacle.x,
                  top: 0,
                  width: OBSTACLE_WIDTH,
                  height: obstacle.gapTop
                }}
              ></div>
              
              {/* Bottom obstacle */}
              <div 
                className="absolute bg-gradient-to-b from-green-500 to-green-700 border-t-4 border-green-800"
                style={{ 
                  left: obstacle.x,
                  top: obstacle.gapBottom,
                  width: OBSTACLE_WIDTH,
                  height: GAME_HEIGHT - obstacle.gapBottom
                }}
              ></div>
            </React.Fragment>
          ))}
          
          {/* Start screen */}
          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Play?</h3>
              <button 
                onClick={startGame}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium text-white"
              >
                Start Game
              </button>
            </div>
          )}
          
          {/* Game over screen */}
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 text-white">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Game Over!</h3>
              <p className="text-xl text-white mb-4">Score: {score}</p>
              <p className="text-sm text-gray-300 mb-6">High Score: {highScore}</p>
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
          )}
        </div>
        
        <div className="text-center mt-4 text-gray-600 text-sm">
          <p>Tap or click to make the gift card fly</p>
          <p>Avoid the obstacles and collect points!</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FlappyBird;