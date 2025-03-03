import React, { useState, useEffect, useRef } from 'react';
import { Clock, Award, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const ReactionTimeChallenge = ({ onComplete, onProgress }) => {
  const [gameState, setGameState] = useState('idle'); // idle, waiting, ready, clicked, finished
  const [targetAppearTime, setTargetAppearTime] = useState(null);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  const [message, setMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [targetColor, setTargetColor] = useState('bg-blue-600');
  const [targetShape, setTargetShape] = useState('rounded-full');
  const [falseStarts, setFalseStarts] = useState(0);
  
  const totalRounds = 5;
  const timerRef = useRef(null);
  const waitTimerRef = useRef(null);
  
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
    };
  }, []);
  
  useEffect(() => {
    if (reactionTimes.length > 0) {
      const sum = reactionTimes.reduce((acc, time) => acc + time, 0);
      setAverageTime(sum / reactionTimes.length);
    }
  }, [reactionTimes]);
  
  useEffect(() => {
    if (currentRound >= totalRounds) {
      setGameState('finished');
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
      
      // Update progress to 100%
      if (onProgress) onProgress(100);
    }
  }, [currentRound, onComplete, onProgress]);
  
  const startGame = () => {
    setGameState('waiting');
    setReactionTimes([]);
    setCurrentRound(0);
    setFalseStarts(0);
    setMessage('انتظر حتى يظهر الهدف...');
    
    // Random wait time between 1-4 seconds
    const waitTime = Math.random() * 3000 + 1000;
    waitTimerRef.current = setTimeout(() => {
      setGameState('ready');
      setTargetAppearTime(Date.now());
      setMessage('انقر الآن!');
      
      // Set random position, color and shape for target
      setTargetPosition({
        x: Math.random() * 70 + 15, // 15-85%
        y: Math.random() * 70 + 15  // 15-85%
      });
      
      const colors = ['bg-blue-600', 'bg-red-600', 'bg-green-600', 'bg-yellow-600', 'bg-purple-600'];
      setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
      
      const shapes = ['rounded-full', 'rounded-lg', 'rounded-none'];
      setTargetShape(shapes[Math.floor(Math.random() * shapes.length)]);
      
    }, waitTime);
  };
  
  const handleClick = () => {
    if (gameState === 'idle') {
      startGame();
    } else if (gameState === 'waiting') {
      // False start
      clearTimeout(waitTimerRef.current);
      setFalseStarts(prev => prev + 1);
      setMessage('بداية خاطئة! انقر للمحاولة مرة أخرى.');
      setGameState('idle');
    } else if (gameState === 'ready') {
      const reactionTime = Date.now() - targetAppearTime;
      setReactionTimes([...reactionTimes, reactionTime]);
      setCurrentRound(currentRound + 1);
      
      // Update progress
      if (onProgress) {
        const progressIncrement = 100 / totalRounds;
        onProgress(progressIncrement);
      }
      
      // Show reaction time
      setMessage(`زمن التفاعل: ${reactionTime} مللي ثانية`);
      
      // Move to next round or finish
      if (currentRound < totalRounds - 1) {
        setGameState('clicked');
        timerRef.current = setTimeout(() => {
          startGame();
        }, 1500);
      } else {
        setGameState('clicked');
        timerRef.current = setTimeout(() => {
          setGameState('finished');
        }, 1500);
      }
    }
  };
  
  const formatReactionTime = (time) => {
    return `${time.toFixed(0)} مللي ثانية`;
  };
  
  const getReactionRating = () => {
    if (averageTime < 250) return 'ممتاز!';
    if (averageTime < 350) return 'جيد جداً!';
    if (averageTime < 450) return 'جيد!';
    return 'حاول أن تكون أسرع!';
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
        <h2 className="text-xl font-bold text-gray-800">تحدي سرعة التفاعل</h2>
        <p className="text-gray-600">انقر بأسرع ما يمكن عندما يظهر الهدف!</p>
      </div>
      
      {gameState === 'idle' ? (
        <div 
          className="bg-blue-50 p-6 rounded-lg text-center cursor-pointer"
          onClick={handleClick}
        >
          <Clock size={48} className="text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-blue-800 mb-2">تحدي سرعة التفاعل</h3>
          <p className="text-blue-700 mb-4">
            انقر عندما يظهر الهدف بأسرع ما يمكن! سيكون هناك {totalRounds} جولات.
          </p>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            ابدأ اللعبة
          </button>
          
          {falseStarts > 0 && (
            <p className="mt-4 text-red-600 text-sm">
              <AlertTriangle size={16} className="inline mr-1" />
              بدايات خاطئة: {falseStarts}
            </p>
          )}
        </div>
      ) : gameState === 'waiting' ? (
        <div 
          className="bg-yellow-50 p-6 rounded-lg text-center h-64 flex flex-col items-center justify-center cursor-pointer"
          onClick={handleClick}
        >
          <AlertTriangle size={48} className="text-yellow-600 mb-4" />
          <h3 className="text-xl font-bold text-yellow-800 mb-2">انتظر...</h3>
          <p className="text-yellow-700">انتظر حتى يظهر الهدف!</p>
        </div>
      ) : gameState === 'ready' ? (
        <div 
          className="relative bg-gray-100 rounded-lg overflow-hidden h-64 cursor-pointer"
          onClick={handleClick}
        >
          <div 
            className={`absolute ${targetColor} ${targetShape} w-16 h-16 flex items-center justify-center text-white font-bold animate-pop-in`}
            style={{
              left: `${targetPosition.x}%`,
              top: `${targetPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            انقر!
          </div>
        </div>
      ) : gameState === 'clicked' ? (
        <div className="bg-green-50 p-6 rounded-lg text-center h-64 flex flex-col items-center justify-center">
          <CheckCircle size={48} className="text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">أحسنت!</h3>
          <p className="text-green-700">{message}</p>
          <p className="text-green-700 mt-2">
            الجولة {currentRound} من {totalRounds}
          </p>
        </div>
      ) : (
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <Award size={48} className="text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">مبروك!</h3>
          <p className="text-green-700 mb-4">
            لقد أكملت تحدي سرعة التفاعل!
          </p>
          
          <div className="bg-white rounded-lg p-4 mb-4">
            <h4 className="font-bold text-gray-800 mb-2">النتائج:</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">متوسط زمن التفاعل:</span>
                <span className="font-medium">{formatReactionTime(averageTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">أفضل زمن:</span>
                <span className="font-medium">{formatReactionTime(Math.min(...reactionTimes))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">التقييم:</span>
                <span className="font-medium text-blue-600">{getReactionRating()}</span>
              </div>
            </div>
          </div>
          
          <p className="text-green-700">
            ستظهر بطاقة الهدية الخاصة بك الآن!
          </p>
        </div>
      )}
      
      {(gameState !== 'idle' && gameState !== 'finished') && (
        <div className="mt-4 bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">الجولة:</span>
            <span className="font-medium">{currentRound + 1} / {totalRounds}</span>
          </div>
          
          {reactionTimes.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">آخر زمن:</span>
                <span className="font-medium">{formatReactionTime(reactionTimes[reactionTimes.length - 1])}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">أفضل زمن:</span>
                <span className="font-medium">{formatReactionTime(Math.min(...reactionTimes))}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReactionTimeChallenge;