import React, { useState, useEffect } from 'react';
import { Gift, Clock, Award, RefreshCw } from 'lucide-react';

const WordScramble = ({ onComplete, onProgress }) => {
  const [words, setWords] = useState([
    { original: 'هدية', scrambled: 'ةيده', hint: 'شيء تقدمه لشخص ما في مناسبة خاصة' },
    { original: 'مبروك', scrambled: 'كوربم', hint: 'تقال للتهنئة' },
    { original: 'سعادة', scrambled: 'ةداعس', hint: 'شعور إيجابي بالرضا والفرح' },
    { original: 'مفاجأة', scrambled: 'ةأجافم', hint: 'شيء غير متوقع' },
    { original: 'احتفال', scrambled: 'لافتحا', hint: 'مناسبة للاحتفاء بحدث مهم' }
  ]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  
  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            if (currentWordIndex < words.length - 1) {
              // Move to next word if time runs out
              setCurrentWordIndex(prevIndex => prevIndex + 1);
              setUserInput('');
              setFeedback(null);
              setShowHint(false);
              return 60; // Reset timer
            } else {
              // End game if on last word
              setGameCompleted(true);
              return 0;
            }
          }
          return prevTimer - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameCompleted, currentWordIndex, words.length]);
  
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
  
  const startGame = () => {
    setGameStarted(true);
    setTimer(60);
    
    // Shuffle the words
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    setWords(shuffledWords);
  };
  
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  
  const checkAnswer = () => {
    const currentWord = words[currentWordIndex];
    
    if (userInput.trim() === currentWord.original) {
      // Correct answer
      setFeedback({ correct: true, message: 'إجابة صحيحة!' });
      
      // Update progress
      if (onProgress) {
        const progressIncrement = 100 / words.length;
        onProgress(progressIncrement);
      }
      
      // Move to next word after a delay
      setTimeout(() => {
        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setUserInput('');
          setFeedback(null);
          setShowHint(false);
          setTimer(60); // Reset timer
        } else {
          // Game completed
          setGameCompleted(true);
          if (onProgress) onProgress(100);
        }
      }, 1500);
    } else {
      // Incorrect answer
      setFeedback({ correct: false, message: 'حاول مرة أخرى!' });
    }
  };
  
  const toggleHint = () => {
    setShowHint(!showHint);
  };
  
  const currentWord = words[currentWordIndex];
  
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
        <h2 className="text-xl font-bold text-gray-800">لعبة ترتيب الكلمات</h2>
        <p className="text-gray-600">رتب الحروف لتكوين الكلمة الصحيحة!</p>
      </div>
      
      {!gameStarted ? (
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <Gift size={48} className="text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-blue-800 mb-2">لعبة ترتيب الكلمات</h3>
          <p className="text-blue-700 mb-4">
            رتب الحروف المبعثرة لتكوين الكلمة الصحيحة. لديك 60 ثانية لكل كلمة!
          </p>
          <button
            onClick={startGame}
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
              <span className={`font-medium ${timer <= 10 ? 'text-red-600' : 'text-blue-800'}`}>
                {timer} ثانية
              </span>
            </div>
            
            <div className="bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-blue-800 font-medium">{currentWordIndex + 1} من {words.length}</span>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-4 text-center">
            <h3 className="text-2xl font-bold text-blue-800 mb-4 tracking-widest">
              {currentWord.scrambled}
            </h3>
            
            {showHint && (
              <p className="text-sm text-blue-600 italic mb-4">
                تلميح: {currentWord.hint}
              </p>
            )}
            
            <div className="flex">
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="اكتب الكلمة هنا..."
                className="flex-1 p-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-right"
                dir="rtl"
              />
              <button
                onClick={checkAnswer}
                className="px-4 py-2 bg-blue-600 text-white rounded-l-lg font-medium hover:bg-blue-700"
              >
                تحقق
              </button>
            </div>
            
            <div className="flex justify-between mt-4">
              <button
                onClick={toggleHint}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {showHint ? 'إخفاء التلميح' : 'إظهار التلميح'}
              </button>
              
              <button
                onClick={() => {
                  if (currentWordIndex < words.length - 1) {
                    setCurrentWordIndex(currentWordIndex + 1);
                    setUserInput('');
                    setFeedback(null);
                    setShowHint(false);
                    setTimer(60);
                  } else {
                    setGameCompleted(true);
                  }
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                تخطي
              </button>
            </div>
          </div>
          
          {feedback && (
            <div className={`p-3 rounded-lg text-center mb-4 ${
              feedback.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {feedback.message}
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2 text-right">تقدمك:</h3>
            <div className="flex justify-between mb-2">
              {words.map((_, index) => (
                <div 
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < currentWordIndex
                      ? 'bg-green-500 text-white'
                      : index === currentWordIndex
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
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
            لقد أكملت لعبة ترتيب الكلمات بنجاح!
          </p>
          <div className="w-48 h-48 mx-auto rounded-lg overflow-hidden mb-4">
            <img 
              src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Gift" 
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

export default WordScramble;