import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, X, ArrowRight, Check, Award } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const questions = [
  {
    question: "What's my favorite color?",
    options: ["Blue", "Red", "Green", "Purple"],
    correctAnswer: 0
  },
  {
    question: "When did we first meet?",
    options: ["At school", "Through mutual friends", "At a party", "At work"],
    correctAnswer: 1
  },
  {
    question: "What's my favorite food?",
    options: ["Pizza", "Sushi", "Burgers", "Pasta"],
    correctAnswer: 2
  },
  {
    question: "What's my dream vacation destination?",
    options: ["Paris", "Maldives", "New York", "Tokyo"],
    correctAnswer: 3
  },
  {
    question: "What's my biggest fear?",
    options: ["Heights", "Spiders", "Public speaking", "Darkness"],
    correctAnswer: 2
  }
];

const FriendshipQuiz = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { width, height } = useWindowSize();

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    const correct = index === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getFriendshipLevel = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Best Friends Forever! 🌟";
    if (percentage >= 60) return "Close Friends! 😊";
    if (percentage >= 40) return "Good Friends! 👍";
    if (percentage >= 20) return "Getting to Know Each Other! 🤝";
    return "Strangers... Time to Bond! 👋";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative bg-white text-gray-800 p-6 rounded-xl"
    >
      {showResult && score >= 3 && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}
      
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={onClose}
          className="p-2 bg-white hover:bg-gray-100 rounded-full shadow-md text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-full mb-4 text-white">
          <Brain className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Friendship Quiz</h2>
        <p className="text-gray-600 mt-2">Test how well you know your friend!</p>
      </div>
      
      {!showResult ? (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-medium text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm font-medium text-blue-600">Score: {score}</span>
          </div>
          
          <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-200">
            <h3 className="text-xl font-medium mb-6 text-gray-800">{questions[currentQuestion].question}</h3>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showFeedback && handleOptionSelect(index)}
                  disabled={showFeedback}
                  className={`
                    w-full text-left p-4 rounded-lg transition-all
                    ${showFeedback && index === questions[currentQuestion].correctAnswer 
                      ? 'bg-green-600 text-white' 
                      : showFeedback && index === selectedOption && index !== questions[currentQuestion].correctAnswer
                        ? 'bg-red-600 text-white'
                        : selectedOption === index
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}
                  `}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 bg-gray-200 text-gray-700 text-sm">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                    
                    {showFeedback && index === questions[currentQuestion].correctAnswer && (
                      <Check className="w-5 h-5 ml-auto text-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {showFeedback && (
            <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-100 border border-green-500' : 'bg-red-100 border border-red-500'}`}>
              <div className="flex items-center">
                {isCorrect ? (
                  <>
                    <Check className="w-5 h-5 mr-2 text-green-600" />
                    <p className="text-green-800">Correct! You know your friend well!</p>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 mr-2 text-red-600" />
                    <p className="text-red-800">Oops! That's not right. Try to remember better next time!</p>
                  </>
                )}
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            {showFeedback && (
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center text-white"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-xl p-8 mb-6 shadow-md border border-gray-200">
            <div className="mb-6">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Quiz Complete!</h3>
              <p className="text-gray-600">You scored {score} out of {questions.length}</p>
            </div>
            
            <div className="p-4 bg-gray-100 rounded-lg mb-6 border border-gray-200">
              <h4 className="text-xl font-bold mb-2 text-orange-500">{getFriendshipLevel()}</h4>
              <p className="text-gray-700">
                {score >= 4 
                  ? "Wow! You really know your friend inside out! Your friendship is truly special."
                  : score >= 3 
                    ? "Great job! You know your friend pretty well. Keep strengthening your bond!"
                    : score >= 2 
                      ? "Not bad! You know some things about your friend, but there's more to learn."
                      : "Looks like you have a lot to learn about your friend. Time for more conversations!"}
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium text-white"
            >
              Continue to Gift
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FriendshipQuiz;