import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, HelpCircle, ChevronRight, Award } from 'lucide-react';

const questions = [
  {
    question: "ما هو اللون المفضل لصديقك؟",
    options: ["أزرق", "أحمر", "أخضر", "أصفر"],
    correctIndex: null // Any answer is valid
  },
  {
    question: "ما هو الطعام المفضل لصديقك؟",
    options: ["بيتزا", "برغر", "سلطة", "معكرونة"],
    correctIndex: null
  },
  {
    question: "ما هو النشاط المفضل لصديقك في وقت الفراغ؟",
    options: ["قراءة", "مشاهدة الأفلام", "ممارسة الرياضة", "السفر"],
    correctIndex: null
  },
  {
    question: "ما هو الموسم المفضل لصديقك؟",
    options: ["الصيف", "الشتاء", "الخريف", "الربيع"],
    correctIndex: null
  },
  {
    question: "ما هو نوع الموسيقى المفضل لصديقك؟",
    options: ["بوب", "روك", "كلاسيك", "راب"],
    correctIndex: null
  }
];

const FriendshipQuiz = ({ onComplete, onProgress }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    if (showResults) {
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
  }, [showResults, onComplete]);

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      
      // Update progress
      const progressIncrement = 100 / questions.length;
      if (onProgress) onProgress(progressIncrement);
    } else {
      // Calculate score - in friendship quiz, all answers are correct
      setScore(100);
      setShowResults(true);
      
      // Final progress update
      if (onProgress) onProgress(100 - (currentQuestion * (100 / questions.length)));
    }
  };

  const getResultMessage = () => {
    if (score >= 80) {
      return "أنت صديق رائع! تعرف الكثير عن صديقك.";
    } else if (score >= 60) {
      return "أنت صديق جيد! يمكنك معرفة المزيد عن صديقك.";
    } else {
      return "حاول أن تتعرف أكثر على صديقك!";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden">
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
      
      {!showResults ? (
        <div className="p-4">
          <div className="flex items-center mb-4">
            <HelpCircle className="text-blue-600 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-800">اختبار الصداقة</h2>
          </div>
          
          <div className="mb-4 bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800 text-right">
              السؤال {currentQuestion + 1} من {questions.length}
            </p>
            <h3 className="text-lg font-medium text-gray-800 mt-1 text-right">
              {questions[currentQuestion].question}
            </h3>
          </div>
          
          <div className="space-y-3 mb-6">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-all text-right ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                {option}
              </div>
            ))}
          </div>
          
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQuestion] === null}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
              selectedAnswers[currentQuestion] === null
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <span>{currentQuestion === questions.length - 1 ? 'إنهاء الاختبار' : 'السؤال التالي'}</span>
            <ChevronRight className="ml-2" size={18} />
          </button>
        </div>
      ) : (
        <div className="p-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="text-green-600" size={40} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">النتيجة: {score}%</h2>
          <p className="text-gray-600 mb-6">{getResultMessage()}</p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-blue-800">
              شكراً لإكمال اختبار الصداقة! ستظهر بطاقة الهدية الخاصة بك الآن.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendshipQuiz;