import React, { useState } from 'react';
import { Gamepad2, Sparkles, Puzzle, Dice5, Trophy, Plus, Minus, Check, X, ChevronRight, ChevronLeft, HelpCircle } from 'lucide-react';

const gameTemplates = [
  {
    id: 'quiz',
    name: 'Trivia Quiz',
    description: 'Create a fun quiz about the recipient',
    icon: <HelpCircle size={24} className="text-indigo-500" />,
    preview: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'puzzle',
    name: 'Picture Puzzle',
    description: 'Create a puzzle with your own image',
    icon: <Puzzle size={24} className="text-green-500" />,
    preview: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'spinner',
    name: 'Prize Wheel',
    description: 'Create a wheel with custom prizes',
    icon: <Dice5 size={24} className="text-pink-500" />,
    preview: 'https://images.unsplash.com/photo-1596778402202-41a6a481bcf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'memory',
    name: 'Memory Game',
    description: 'Create a memory matching game',
    icon: <Sparkles size={24} className="text-amber-500" />,
    preview: 'https://images.unsplash.com/photo-1606326608690-4e0281b1e588?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  }
];

const GameCreator = ({ onGameCreate, onCancel }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [step, setStep] = useState(1);
  const [gameConfig, setGameConfig] = useState({
    quiz: {
      questions: [
        { question: '', options: ['', '', ''], answer: 0 }
      ],
      title: 'Fun Quiz',
      reward: 'Gift Card Reveal'
    },
    puzzle: {
      image: null,
      difficulty: 'medium',
      pieces: 9,
      reward: 'Gift Card Reveal'
    },
    spinner: {
      prizes: ['Gift Card', 'Bonus $5', 'Special Message', 'Discount Code'],
      colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'],
      reward: 'Gift Card Reveal'
    },
    memory: {
      theme: 'emoji',
      difficulty: 'medium',
      pairs: 6,
      reward: 'Gift Card Reveal'
    }
  });

  const handleGameSelect = (gameId) => {
    setSelectedGame(gameId);
    setStep(2);
  };

  const handleConfigChange = (game, field, value) => {
    setGameConfig(prev => ({
      ...prev,
      [game]: {
        ...prev[game],
        [field]: value
      }
    }));
  };

  const handleQuizQuestionChange = (index, field, value) => {
    const newQuestions = [...gameConfig.quiz.questions];
    
    if (field === 'question') {
      newQuestions[index].question = value;
    } else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.split('-')[1]);
      newQuestions[index].options[optionIndex] = value;
    } else if (field === 'answer') {
      newQuestions[index].answer = parseInt(value);
    }
    
    setGameConfig(prev => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        questions: newQuestions
      }
    }));
  };

  const addQuizQuestion = () => {
    setGameConfig(prev => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        questions: [
          ...prev.quiz.questions,
          { question: '', options: ['', '', ''], answer: 0 }
        ]
      }
    }));
  };

  const removeQuizQuestion = (index) => {
    if (gameConfig.quiz.questions.length <= 1) return;
    
    const newQuestions = [...gameConfig.quiz.questions];
    newQuestions.splice(index, 1);
    
    setGameConfig(prev => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        questions: newQuestions
      }
    }));
  };

  const handleSubmit = () => {
    onGameCreate({
      type: selectedGame,
      config: gameConfig[selectedGame]
    });
  };

  const renderGameConfig = () => {
    switch (selectedGame) {
      case 'quiz':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="quizTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Quiz Title
              </label>
              <input
                type="text"
                id="quizTitle"
                value={gameConfig.quiz.title}
                onChange={(e) => handleConfigChange('quiz', 'title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Enter a fun title for your quiz"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-md font-medium text-gray-700">Questions</h4>
                <button
                  onClick={addQuizQuestion}
                  className="flex items-center space-x-1 px-2 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
                >
                  <Plus size={14} />
                  <span>Add Question</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {gameConfig.quiz.questions.map((question, qIndex) => (
                  <div key={qIndex} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-medium text-gray-800">Question {qIndex + 1}</h5>
                      <button
                        onClick={() => removeQuizQuestion(qIndex)}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                        disabled={gameConfig.quiz.questions.length <= 1}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => handleQuizQuestionChange(qIndex, 'question', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                          placeholder="Enter your question"
                        />
                      </div>
                      
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`q${qIndex}-o${oIndex}`}
                            name={`q${qIndex}-answer`}
                            value={oIndex}
                            checked={question.answer === oIndex}
                            onChange={(e) => handleQuizQuestionChange(qIndex, 'answer', e.target.value)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleQuizQuestionChange(qIndex, `option-${oIndex}`, e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            placeholder={`Option ${oIndex + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="quizReward" className="block text-sm font-medium text-gray-700 mb-1">
                Reward for Completion
              </label>
              <input
                type="text"
                id="quizReward"
                value={gameConfig.quiz.reward}
                onChange={(e) => handleConfigChange('quiz', 'reward', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="What will they win?"
              />
            </div>
          </div>
        );
        
      case 'puzzle':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image for Puzzle
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition cursor-pointer">
                <Puzzle size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Click to upload an image or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG or GIF up to 5MB
                </p>
                <button className="mt-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  Select Image
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['easy', 'medium', 'hard'].map((level) => (
                  <button
                    key={level}
                    className={`py-2 rounded-lg text-sm font-medium capitalize ${
                      gameConfig.puzzle.difficulty === level
                        ? 'bg-green-100 text-green-700 border-2 border-green-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                    onClick={() => handleConfigChange('puzzle', 'difficulty', level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Pieces
              </label>
              <div className="flex items-center space-x-4">
                <button
                  className="p-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={() => handleConfigChange('puzzle', 'pieces', Math.max(4, gameConfig.puzzle.pieces - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-medium text-gray-800">{gameConfig.puzzle.pieces}</span>
                <button
                  className="p-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={() => handleConfigChange('puzzle', 'pieces', Math.min(16, gameConfig.puzzle.pieces + 1))}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'spinner':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wheel Prizes
              </label>
              <div className="space-y-2">
                {gameConfig.spinner.prizes.map((prize, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: gameConfig.spinner.colors[index] }}
                    ></div>
                    <input
                      type="text"
                      value={prize}
                      onChange={(e) => {
                        const newPrizes = [...gameConfig.spinner.prizes];
                        newPrizes[index] = e.target.value;
                        handleConfigChange('spinner', 'prizes', newPrizes);
                      }}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                      placeholder={`Prize ${index + 1}`}
                    />
                    {gameConfig.spinner.prizes.length > 3 && (
                      <button
                        onClick={() => {
                          const newPrizes = [...gameConfig.spinner.prizes];
                          const newColors = [...gameConfig.spinner.colors];
                          newPrizes.splice(index, 1);
                          newColors.splice(index, 1);
                          handleConfigChange('spinner', 'prizes', newPrizes);
                          handleConfigChange('spinner', 'colors', newColors);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                
                {gameConfig.spinner.prizes.length < 8 && (
                  <button
                    onClick={() => {
                      const newPrizes = [...gameConfig.spinner.prizes, 'New Prize'];
                      const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
                      const newColors = [...gameConfig.spinner.colors, randomColor];
                      handleConfigChange('spinner', 'prizes', newPrizes);
                      handleConfigChange('spinner', 'colors', newColors);
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-pink-600 bg-pink-50 rounded-lg hover:bg-pink-100 w-full justify-center mt-2"
                  >
                    <Plus size={14} />
                    <span>Add Prize</span>
                  </button>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preview
              </label>
              <div className="border border-gray-200 rounded-lg p-4 flex justify-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 relative">
                  {gameConfig.spinner.prizes.map((prize, index) => (
                    <div 
                      key={index}
                      className="absolute w-1 h-16 bg-white"
                      style={{ 
                        left: 'calc(50% - 0.5px)', 
                        top: '0', 
                        transformOrigin: 'bottom center',
                        transform: `rotate(${index * (360 / gameConfig.spinner.prizes.length)}deg)`
                      }}
                    />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                      <Trophy size={20} className="text-amber-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'memory':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Game Theme
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['emoji', 'animals', 'custom'].map((theme) => (
                  <button
                    key={theme}
                    className={`py-2 rounded-lg text-sm font-medium capitalize ${
                      gameConfig.memory.theme === theme
                        ? 'bg-amber-100 text-amber-700 border-2 border-amber-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                    onClick={() => handleConfigChange('memory', 'theme', theme)}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['easy', 'medium', 'hard'].map((level) => (
                  <button
                    key={level}
                    className={`py-2 rounded-lg text-sm font-medium capitalize ${
                      gameConfig.memory.difficulty === level
                        ? 'bg-amber-100 text-amber-700 border-2 border-amber-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                    onClick={() => handleConfigChange('memory', 'difficulty', level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Pairs
              </label>
              <div className="flex items-center space-x-4">
                <button
                  className="p-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={() => handleConfigChange('memory', 'pairs', Math.max(3, gameConfig.memory.pairs - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-medium text-gray-800">{gameConfig.memory.pairs}</span>
                <button
                  className="p-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={() => handleConfigChange('memory', 'pairs', Math.min(12, gameConfig.memory.pairs + 1))}
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Total cards: {gameConfig.memory.pairs * 2}
              </p>
            </div>
            
            {gameConfig.memory.theme === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Custom Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-500 transition cursor-pointer">
                  <Sparkles size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Upload {gameConfig.memory.pairs} images for your memory game
                  </p>
                  <button className="mt-4 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium">
                    Select Images
                  </button>
                </div>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Gamepad2 size={24} className="text-indigo-600" />
          <h3 className="text-xl font-semibold text-gray-800">Interactive Game Creator</h3>
        </div>
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <ChevronLeft size={16} />
            <span>Back</span>
          </button>
        )}
      </div>
      
      {step === 1 && (
        <div>
          <p className="text-gray-600 mb-4">
            Add an interactive game to make your gift card more fun and engaging. The recipient will play the game to reveal their gift!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gameTemplates.map((template) => (
              <div
                key={template.id}
                className="border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md"
                onClick={() => handleGameSelect(template.id)}
              >
                <div className="h-36 overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={template.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    {template.icon}
                    <h4 className="font-semibold text-gray-800">{template.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                {gameTemplates.find(t => t.id === selectedGame)?.icon || <Gamepad2 size={16} className="text-indigo-600" />}
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-indigo-800">
                  {gameTemplates.find(t => t.id === selectedGame)?.name || 'Game'} Configuration
                </h4>
                <p className="mt-1 text-xs text-indigo-700">
                  Customize your game settings below. The recipient will play this game to reveal their gift card.
                </p>
              </div>
            </div>
          </div>
          
          {renderGameConfig()}
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
            >
              <span>Create Game</span>
              <Check size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCreator;