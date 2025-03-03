import React, { useState, useEffect, useRef } from 'react';
import { Gift, Award } from 'lucide-react';

const FlappyBird = ({ onComplete, onProgress }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [birdPosition, setBirdPosition] = useState(50);
  const [obstacles, setObstacles] = useState([]);
  const [gravity, setGravity] = useState(2);
  const gameAreaRef = useRef(null);
  const gameLoopRef = useRef(null);
  const obstacleGeneratorRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  const gameAreaHeight = 300;
  const gameAreaWidth = 400;
  const birdSize = 30;
  const obstacleWidth = 50;
  const gapSize = 100;

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (obstacleGeneratorRef.current) clearInterval(obstacleGeneratorRef.current);
    };
  }, []);

  useEffect(() => {
    if (gameOver && score >= 5) {
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
  }, [gameOver, score, onComplete]);

  const startGame = () => {
    if (gameStarted) return;
    
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setBirdPosition(50);
    setObstacles([]);
    setGravity(2);

    // Game loop
    gameLoopRef.current = setInterval(() => {
      setBirdPosition(prevPosition => {
        const newPosition = prevPosition + gravity;
        
        // Check if bird hits the boundaries
        if (newPosition <= 0 || newPosition >= gameAreaHeight - birdSize) {
          endGame();
          return prevPosition;
        }
        
        // Check collision with obstacles
        const collision = checkCollision(newPosition);
        if (collision) {
          endGame();
          return prevPosition;
        }
        
        return newPosition;
      });
      
      // Move obstacles
      setObstacles(prevObstacles => {
        const updatedObstacles = prevObstacles
          .map(obstacle => ({
            ...obstacle,
            x: obstacle.x - 5
          }))
          .filter(obstacle => obstacle.x + obstacleWidth > 0);
        
        // Check if bird passed an obstacle
        const passedObstacle = prevObstacles.find(
          obstacle => obstacle.x + obstacleWidth <= birdSize && !obstacle.passed
        );
        
        if (passedObstacle) {
          const newScore = score + 1;
          setScore(newScore);
          
          // Update progress
          if (onProgress) {
            const progressIncrement = Math.min(20, 100 / 5); // 5 points to win
            onProgress(progressIncrement);
          }
          
          // Mark obstacle as passed
          return updatedObstacles.map(obstacle => 
            obstacle.id === passedObstacle.id 
              ? { ...obstacle, passed: true } 
              : obstacle
          );
        }
        
        return updatedObstacles;
      });
      
    }, 50);
    
    // Generate obstacles
    obstacleGeneratorRef.current = setInterval(() => {
      const gapPosition = Math.floor(Math.random() * (gameAreaHeight - gapSize));
      
      setObstacles(prevObstacles => [
        ...prevObstacles,
        {
          id: Date.now(),
          x: gameAreaWidth,
          gapTop: gapPosition,
          gapBottom: gapPosition + gapSize,
          passed: false
        }
      ]);
    }, 2000);
  };

  const endGame = () => {
    setGameOver(true);
    clearInterval(gameLoopRef.current);
    clearInterval(obstacleGeneratorRef.current);
    
    // If score is high enough, complete the game
    if (score >= 5) {
      if (onProgress) onProgress(100);
    }
  };

  const checkCollision = (birdPos) => {
    for (const obstacle of obstacles) {
      if (
        birdSize >= obstacle.x && 
        0 <= obstacle.x + obstacleWidth &&
        (birdPos <= obstacle.gapTop || birdPos + birdSize >= obstacle.gapBottom)
      ) {
        return true;
      }
    }
    return false;
  };

  const handleJump = () => {
    if (!gameStarted) {
      startGame();
    } else if (!gameOver) {
      setBirdPosition(prevPosition => Math.max(0, prevPosition - 30));
    } else {
      startGame();
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
        <h2 className="text-xl font-bold text-gray-800">لعبة الهدايا الطائرة</h2>
        <p className="text-gray-600">اضغط للقفز واجمع 5 نقاط للفوز!</p>
      </div>
      
      <div 
        ref={gameAreaRef}
        className="relative bg-blue-100 rounded-lg overflow-hidden cursor-pointer mx-auto"
        style={{ width: gameAreaWidth, height: gameAreaHeight }}
        onClick={handleJump}
      >
        {/* Bird */}
        <div 
          className="absolute bg-blue-600 rounded-full flex items-center justify-center"
          style={{ 
            width: birdSize, 
            height: birdSize, 
            top: birdPosition, 
            left: birdSize,
            transition: 'top 0.1s ease-out'
          }}
        >
          <Gift size={16} className="text-white" />
        </div>
        
        {/* Obstacles */}
        {obstacles.map(obstacle => (
          <React.Fragment key={obstacle.id}>
            {/* Top obstacle */}
            <div 
              className="absolute bg-green-500"
              style={{ 
                width: obstacleWidth, 
                height: obstacle.gapTop, 
                top: 0, 
                left: obstacle.x 
              }}
            ></div>
            
            {/* Bottom obstacle */}
            <div 
              className="absolute bg-green-500"
              style={{ 
                width: obstacleWidth, 
                height: gameAreaHeight - obstacle.gapBottom, 
                top: obstacle.gapBottom, 
                left: obstacle.x 
              }}
            ></div>
          </React.Fragment>
        ))}
        
        {/* Score */}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-bold">
          {score}
        </div>
        
        {/* Start/Game Over overlay */}
        {(!gameStarted || gameOver) && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
            {!gameStarted ? (
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">لعبة الهدايا الطائرة</h3>
                <p className="mb-4">اضغط للبدء</p>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">انتهت اللعبة</h3>
                <p className="mb-2">النتيجة: {score}</p>
                {score >= 5 ? (
                  <div className="flex flex-col items-center">
                    <Award className="text-yellow-400 mb-2" size={40} />
                    <p className="text-green-400">مبروك! لقد فزت!</p>
                  </div>
                ) : (
                  <p>اضغط للعب مرة أخرى</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        تحتاج إلى 5 نقاط للفوز وفتح بطاقة الهدية
      </div>
    </div>
  );
};

export default FlappyBird;