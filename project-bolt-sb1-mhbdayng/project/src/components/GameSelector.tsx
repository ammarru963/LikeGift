import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Zap, Brain, Timer, Puzzle, Gift } from 'lucide-react';
import FriendshipQuiz from './games/FriendshipQuiz';
import FlappyBird from './games/FlappyBird';
import MazeGame from './games/MazeGame';
import CardMatching from './games/CardMatching';
import DigitalScratchCard from './games/DigitalScratchCard';
import ReactionGame from './games/ReactionGame';

const games = [
  { 
    id: 'quiz', 
    name: 'Friendship Quiz', 
    icon: <Brain className="w-6 h-6" />,
    description: 'Create a quiz about your friendship with multiple-choice questions',
    preview: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'flappybird', 
    name: 'Gift Card Flappy Bird', 
    icon: <Gift className="w-6 h-6" />,
    description: 'A flying gift card dodges obstacles in this endless runner game',
    preview: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'maze', 
    name: 'Maze of Gifts', 
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="9" y1="3" x2="9" y2="21"></line>
      <line x1="15" y1="3" x2="15" y2="21"></line>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="3" y1="15" x2="21" y2="15"></line>
    </svg>,
    description: 'Navigate through a maze to find the gift at the end',
    preview: 'https://images.unsplash.com/photo-1422479516648-9b1f0b6e8da8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'memory', 
    name: 'Card Matching Challenge', 
    icon: <Puzzle className="w-6 h-6" />,
    description: 'Find matching pairs of gift-themed cards in this memory game',
    preview: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'scratch', 
    name: 'Digital Scratch-off', 
    icon: <Gift className="w-6 h-6" />,
    description: 'Scratch to reveal hidden messages and the gift card',
    preview: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'reaction', 
    name: 'Reaction Time Challenge', 
    icon: <Zap className="w-6 h-6" />,
    description: 'Test reflexes by tapping targets to unlock the gift message',
    preview: 'https://images.unsplash.com/photo-1511377107391-116a9d5d20b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
];

const GameSelector = ({ giftData, updateGiftData, nextStep, prevStep }) => {
  const [selectedGames, setSelectedGames] = useState(giftData.games || []);
  const [activeGame, setActiveGame] = useState(null);
  const [previewGame, setPreviewGame] = useState(null);
  const [customizingGame, setCustomizingGame] = useState(null);
  
  const toggleGameSelection = (gameId) => {
    if (selectedGames.includes(gameId)) {
      setSelectedGames(selectedGames.filter(id => id !== gameId));
    } else {
      setSelectedGames([...selectedGames, gameId]);
    }
  };

  const handleSaveGames = () => {
    updateGiftData({ games: selectedGames });
  };

  const handleContinue = () => {
    handleSaveGames();
    nextStep();
  };

  const renderGamePreview = () => {
    switch(previewGame) {
      case 'quiz':
        return <FriendshipQuiz onClose={() => setPreviewGame(null)} />;
      case 'flappybird':
        return <FlappyBird onClose={() => setPreviewGame(null)} />;
      case 'maze':
        return <MazeGame onClose={() => setPreviewGame(null)} />;
      case 'memory':
        return <CardMatching onClose={() => setPreviewGame(null)} />;
      case 'scratch':
        return <DigitalScratchCard onClose={() => setPreviewGame(null)} />;
      case 'reaction':
        return <ReactionGame onClose={() => setPreviewGame(null)} />;
      default:
        return null;
    }
  };

  const renderGameCustomization = () => {
    const game = games.find(g => g.id === customizingGame);
    if (!game) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full bg-white rounded-xl p-8 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <div className="p-3 rounded-full mr-3 bg-blue-600 text-white">
                {game.icon}
              </div>
              Customize {game.name}
            </h3>
            <button 
              onClick={() => setCustomizingGame(null)}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          {customizingGame === 'quiz' && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">Quiz Title</label>
                <input
                  type="text"
                  placeholder="Our Friendship Test"
                  className="w-full px-5 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                />
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">Questions</label>
                <div className="space-y-4">
                  {[1, 2, 3].map((q) => (
                    <div key={q} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-700">Question {q}</h4>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="What's my favorite color?"
                        className="w-full px-4 py-2 mb-3 bg-white border border-gray-300 rounded-lg"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <input type="radio" id={`q${q}-a1`} name={`q${q}`} className="mr-2" />
                          <input
                            type="text"
                            placeholder="Blue"
                            className="w-full px-3 py-1 bg-white border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id={`q${q}-a2`} name={`q${q}`} className="mr-2" />
                          <input
                            type="text"
                            placeholder="Red"
                            className="w-full px-3 py-1 bg-white border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id={`q${q}-a3`} name={`q${q}`} className="mr-2" />
                          <input
                            type="text"
                            placeholder="Green"
                            className="w-full px-3 py-1 bg-white border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id={`q${q}-a4`} name={`q${q}`} className="mr-2" />
                          <input
                            type="text"
                            placeholder="Yellow"
                            className="w-full px-3 py-1 bg-white border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm flex items-center text-white">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Question
                </button>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setPreviewGame('quiz')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                >
                  Preview Game
                </button>
                <button
                  onClick={() => setCustomizingGame(null)}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white"
                >
                  Save Customization
                </button>
              </div>
            </div>
          )}
          
          {customizingGame === 'maze' && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">Maze Difficulty</label>
                <div className="flex space-x-4">
                  <button className="px-5 py-3 bg-blue-600 text-white rounded-lg">Easy</button>
                  <button className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg">Medium</button>
                  <button className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg">Hard</button>
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">Maze Theme</label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center cursor-pointer ring-2 ring-blue-500">
                    <div className="w-full h-24 bg-blue-100 rounded-lg mb-2 flex items-center justify-center">
                      <Gift className="w-8 h-8 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Space</span>
                  </div>
                  <div className="p-4 bg-white rounded-lg text-center cursor-pointer hover:bg-gray-50 border border-gray-200">
                    <div className="w-full h-24 bg-green-100 rounded-lg mb-2 flex items-center justify-center">
                      <Gift className="w-8 h-8 text-green-600" />
                    </div>
                    <span className="text-gray-700">Forest</span>
                  </div>
                  <div className="p-4 bg-white rounded-lg text-center cursor-pointer hover:bg-gray-50 border border-gray-200">
                    <div className="w-full h-24 bg-yellow-100 rounded-lg mb-2 flex items-center justify-center">
                      <Gift className="w-8 h-8 text-yellow-600" />
                    </div>
                    <span className="text-gray-700">Desert</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setPreviewGame('maze')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                >
                  Preview Game
                </button>
                <button
                  onClick={() => setCustomizingGame(null)}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white"
                >
                  Save Customization
                </button>
              </div>
            </div>
          )}
          
          {(customizingGame === 'flappybird' || customizingGame === 'memory' || customizingGame === 'scratch' || customizingGame === 'reaction') && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">Game Difficulty</label>
                <div className="flex space-x-4">
                  <button className="px-5 py-3 bg-blue-600 text-white rounded-lg">Easy</button>
                  <button className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg">Medium</button>
                  <button className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg">Hard</button>
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">Game Theme</label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center cursor-pointer ring-2 ring-blue-500">
                    <div className="w-full h-24 bg-blue-100 rounded-lg mb-2 flex items-center justify-center">
                      <Gift className="w-8 h-8 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Classic</span>
                  </div>
                  <div className="p-4 bg-white rounded-lg text-center cursor-pointer hover:bg-gray-50 border border-gray-200">
                    <div className="w-full h-24 bg-purple-100 rounded-lg mb-2 flex items-center justify-center">
                      <Gift className="w-8 h-8 text-purple-600" />
                    </div>
                    <span className="text-gray-700">Neon</span>
                  </div>
                  <div className="p-4 bg-white rounded-lg text-center cursor-pointer hover:bg-gray-50 border border-gray-200">
                    <div className="w-full h-24 bg-pink-100 rounded-lg mb-2 flex items-center justify-center">
                      <Gift className="w-8 h-8 text-pink-600" />
                    </div>
                    <span className="text-gray-700">Cute</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setPreviewGame(customizingGame)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                >
                  Preview Game
                </button>
                <button
                  onClick={() => setCustomizingGame(null)}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white"
                >
                  Save Customization
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      {previewGame ? (
        renderGamePreview()
      ) : customizingGame ? (
        renderGameCustomization()
      ) : (
        <>
          <h2 className="text-4xl font-bold mb-8 text-center">Interactive Games <span className="text-orange-500">🎮</span></h2>
          <p className="text-gray-600 text-center mb-4 text-lg">
            Add fun games to make your gift experience more engaging
          </p>
          <p className="text-gray-500 text-center text-sm mb-14">
            (Optional) These games will be played before the recipient can access their gift
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
            {games.map((game) => (
              <div 
                key={game.id}
                className={`
                  relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 h-72
                  ${selectedGames.includes(game.id) 
                    ? 'ring-3 ring-orange-400 shadow-lg' 
                    : 'ring-1 ring-gray-200'}
                `}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: `url(${game.preview})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30 z-10"></div>
                
                <div className="relative z-20 p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full mr-3 ${selectedGames.includes(game.id) ? 'bg-orange-500' : 'bg-gray-700'}`}>
                        {game.icon}
                      </div>
                      <h3 className="font-medium text-xl text-white">{game.name}</h3>
                    </div>
                    
                    <div className="flex items-center">
                      <button
                        onClick={() => setActiveGame(activeGame === game.id ? null : game.id)}
                        className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 mr-3"
                      >
                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => toggleGameSelection(game.id)}
                        className={`w-7 h-7 rounded-md ${selectedGames.includes(game.id) ? 'bg-orange-500' : 'bg-gray-700'} flex items-center justify-center`}
                      >
                        {selectedGames.includes(game.id) && (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-300 mt-4 flex-grow">{game.description}</p>
                  
                  {activeGame === game.id && (
                    <div className="mt-6 p-4 bg-gray-800 bg-opacity-80 rounded-lg">
                      <h4 className="text-lg font-medium mb-3 text-white">Game Options</h4>
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => setCustomizingGame(game.id)}
                          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm flex items-center text-white"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                          Customize
                        </button>
                        <button 
                          onClick={() => setPreviewGame(game.id)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm flex items-center text-white"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                          Preview
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {selectedGames.length > 0 && (
            <div className="mb-14 p-8 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-center mb-6">
                <Gamepad2 className="w-8 h-8 mr-4 text-orange-500" />
                <h3 className="font-medium text-2xl text-gray-800">Selected Games ({selectedGames.length})</h3>
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                Your recipient will play these games before receiving their gift card. They'll be presented in the order shown below.
              </p>
              <div className="flex flex-wrap gap-4">
                {selectedGames.map((gameId, index) => {
                  const game = games.find(g => g.id === gameId);
                  return (
                    <div key={gameId} className="flex items-center bg-white rounded-full px-5 py-3 text-lg border border-gray-200 shadow-sm">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-800">{game.name}</span>
                      <button 
                        onClick={() => toggleGameSelection(gameId)}
                        className="ml-4 text-gray-400 hover:text-gray-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-14 flex justify-between">
            <button
              onClick={prevStep}
              className="px-8 py-4 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center text-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back
            </button>
            <button
              onClick={handleContinue}
              className="px-8 py-4 rounded-xl font-medium bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500 flex items-center text-lg"
            >
              Continue
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default GameSelector;