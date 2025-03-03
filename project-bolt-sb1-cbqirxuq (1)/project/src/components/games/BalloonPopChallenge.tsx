import React, { useState, useEffect } from 'react';
import { Gift, Award } from 'lucide-react';

const BalloonPopChallenge = ({ onComplete, onProgress }) => {
  const [balloons, setBalloons] = useState([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [specialBalloonIndex, setSpecialBalloonIndex] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [message, setMessage] = useState('');
  
  const totalBalloons = 12;
  const balloonsToWin = 8;
  
  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      initializeBalloons();
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
    // Check if enough balloons are popped
    if (poppedCount >= balloonsToWin && gameStarted) {
      setGameCompleted(true);
      if (onProgress) onProgress(100);
    } else if (gameStarted && poppedCount > 0) {
      // Update progress
      if (onProgress) {
        const progressIncrement = 100 / balloonsToWin;
        onProgress(progressIncrement);
      }
    }
  }, [poppedCount, gameStarted, onProgress]);
  
  const initializeBalloons = () => {
    // Create balloons with random positions and colors
    const newBalloons = [];
    for (let i = 0; i < totalBalloons; i++) {
      newBalloons.push({
        id: i,
        color: ['blue', 'red', 'green', 'yellow', 'purple'][Math.floor(Math.random() * 5)],
        size: Math.random() * 20 + 40, // 40-60px
        x: Math.random() * 80 + 10, // 10-90%
        y: Math.random() * 80 + 10, // 10-90%
        popped: false,
        animationDelay: Math.random() * 2, // 0-2s
        animationDuration: Math.random() * 2 + 3, // 3-5s
        message: i === specialBalloonIndex ? 'هدية خاصة!' : ['أحسنت!', 'رائع!', 'استمر!', '+1 نقطة'][Math.floor(Math.random() * 4)]
      });
    }
    
    // Set one balloon as special (contains the gift)
    const specialIndex = Math.floor(Math.random() * totalBalloons);
    setSpecialBalloonIndex(specialIndex);
    
    setBalloons(newBalloons);
    setPoppedCount(0);
    setMessage('');
  };
  
  const handleBalloonPop = (index) => {
    if (!gameStarted || gameCompleted) return;
    
    const newBalloons = [...balloons];
    if (!newBalloons[index].popped) {
      newBalloons[index].popped = true;
      setBalloons(newBalloons);
      setPoppedCount(prev => prev + 1);
      
      // Show message
      setMessage(newBalloons[index].message);
      setTimeout(() => setMessage(''), 1500);
      
      // Check if special balloon was popped
      if (index === specialBalloonIndex) {
        setGameCompleted(true);
        if (onProgress) onProgress(100);
      }
    }
  };
  
  const startGame = () => {
    setGameStarted(true);
    setGameCompleted(false);
    setPoppedCount(0);
    setMessage('');
  };
  
  const getColorClass = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-500';
      case 'red': return 'bg-red-500';
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-blue-500';
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
        <h2 className="text-xl font-bold text-gray-800">تحدي فرقعات البالونات</h2>
        <p className="text-gray-600">افرقع البالونات للعثور على الهدية!</p>
      </div>
      
      {!gameStarted ? (
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <Gift size={48} className="text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-blue-800 mb-2">تحدي البالونات</h3>
          <p className="text-blue-700 mb-4">
            افرقع البالونات للعثور على الهدية المخفية! تحتاج إلى فرقعة {balloonsToWin} بالونات على الأقل.
          </p>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            ابدأ اللعبة
          </button> </div>
      ) : !gameCompleted ? (
        <>
          <div className="bg-blue-50 p-3 rounded-lg mb-4 flex justify-between items-center">
            <span className="text-blue-800 font-medium">البالونات المفرقعة: {poppedCount} / {balloonsToWin}</span>
            <span className="text-blue-800 font-medium">المتبقي: {totalBalloons - poppedCount}</span>
          </div>
          
          {message && (
            <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-full shadow-lg text-lg font-bold text-blue-600 animate-pop-in z-10">
              {message}
            </div>
          )}
          
          <div className="relative bg-blue-100 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            {balloons.map((balloon, index) => (
              <div
                key={balloon.id}
                className={`absolute cursor-pointer transition-all duration-300 ${
                  balloon.popped ? 'opacity-0 scale-150' : 'animate-float-' + (index % 5 + 1)
                }`}
                style={{
                  left: `${balloon.x}%`,
                  top: `${balloon.y}%`,
                  animationDelay: `${balloon.animationDelay}s`,
                  animationDuration: `${balloon.animationDuration}s`,
                  zIndex: balloon.popped ? 0 : 10
                }}
                onClick={() => handleBalloonPop(index)}
              >
                {!balloon.popped && (
                  <div 
                    className={`relative ${getColorClass(balloon.color)} rounded-full`}
                    style={{ 
                      width: `${balloon.size}px`, 
                      height: `${balloon.size * 1.2}px`
                    }}
                  >
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-10 bg-gray-400"></div>
                    {index === specialBalloonIndex && (
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <Gift size={balloon.size / 3} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            انقر على البالونات لفرقعتها. ابحث عن البالون الخاص الذي يحتوي على الهدية!
          </p>
        </>
      ) : (
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <Award size={48} className="text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">مبروك!</h3>
          <p className="text-green-700 mb-4">
            لقد فرقعت {poppedCount} بالونات ووجدت الهدية!
          </p>
          <div className="w-48 h-48 mx-auto rounded-lg overflow-hidden mb-4 bg-blue-100 flex items-center justify-center">
            <Gift size={64} className="text-blue-600" />
          </div>
          <p className="text-green-700">
            ستظهر بطاقة الهدية الخاصة بك الآن!
          </p>
        </div>
      )}
    </div>
  );
};

export default BalloonPopChallenge;