import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Package, Sparkles, Music } from 'lucide-react';

const wrappingStyles = [
  { id: 'envelope', name: 'Envelope Animation', icon: <Gift className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { id: 'giftbox', name: 'Gift Box Animation', icon: <Package className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { id: 'confetti', name: 'Confetti Explosion', icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { id: 'simple', name: 'Simple Presentation', icon: <Gift className="w-5 h-5 sm:w-6 sm:h-6" /> },
];

const musicOptions = [
  { id: 'birthday', name: 'Birthday Tune', preview: '🎵 Happy Birthday melody' },
  { id: 'celebration', name: 'Celebration', preview: '🎵 Upbeat celebration music' },
  { id: 'romantic', name: 'Romantic', preview: '🎵 Soft romantic melody' },
  { id: 'fun', name: 'Fun & Playful', preview: '🎵 Playful, cheerful tune' },
  { id: 'none', name: 'No Music', preview: 'No background music' },
];

const DigitalWrapping = ({ giftData, updateGiftData, nextStep, prevStep }) => {
  const [selectedStyle, setSelectedStyle] = useState(giftData.wrapping.style || 'envelope');
  const [selectedMusic, setSelectedMusic] = useState(giftData.wrapping.music || 'none');
  const [animationEnabled, setAnimationEnabled] = useState(giftData.wrapping.animation !== false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleSaveWrapping = () => {
    updateGiftData({
      wrapping: {
        style: selectedStyle,
        animation: animationEnabled,
        music: selectedMusic
      }
    });
  };

  const handleContinue = () => {
    handleSaveWrapping();
    nextStep();
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-4"
    >
      {previewMode ? (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Wrapping Preview</h3>
              <button 
                onClick={togglePreviewMode}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center overflow-hidden">
              {selectedStyle === 'envelope' && (
                <div className="text-center">
                  <div className="relative w-64 sm:w-80 md:w-96 h-40 sm:h-52 md:h-64 mx-auto bg-orange-500 rounded-xl transform rotate-3 shadow-xl">
                    <div className="absolute inset-2 bg-gray-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400">{giftData.cardValue} SAR</span>
                    </div>
                    <div className={`absolute inset-0 bg-orange-400 rounded-lg flex items-center justify-center transition-transform duration-1000 ${animationEnabled ? 'animate-pulse' : ''}`}>
                      <Gift className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 text-white" />
                    </div>
                  </div>
                  <p className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-base md:text-lg">
                    {animationEnabled 
                      ? "The envelope will animate open when your recipient views it" 
                      : "Static envelope presentation (animations disabled)"}
                  </p>
                </div>
              )}
              
              {selectedStyle === 'giftbox' && (
                <div className="text-center">
                  <div className="relative w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 mx-auto">
                    <div className="w-full h-full bg-blue-600 rounded-xl"></div>
                    <div className={`absolute top-0 left-0 w-full h-12 sm:h-14 md:h-16 bg-blue-500 rounded-t-xl transform origin-bottom ${animationEnabled ? 'animate-pulse' : ''}`}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl sm:text-3xl md:text-4xl">
                      {giftData.cardValue} SAR
                    </div>
                  </div>
                  <p className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-base md:text-lg">
                    {animationEnabled 
                      ? "The gift box will unwrap with a 3D animation" 
                      : "Static gift box presentation (animations disabled)"}
                  </p>
                </div>
              )}
              
              {selectedStyle === 'confetti' && (
                <div className="text-center">
                  <div className="relative w-64 sm:w-80 md:w-96 h-40 sm:h-52 md:h-64 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{giftData.cardValue} SAR</span>
                    {animationEnabled && (
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-1/4 w-2 sm:w-3 h-2 sm:h-3 bg-yellow-400 rounded-full animate-ping"></div>
                        <div className="absolute top-1/3 left-1/2 w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full animate-ping delay-100"></div>
                        <div className="absolute top-1/2 left-3/4 w-2 sm:w-3 h-2 sm:h-3 bg-pink-400 rounded-full animate-ping delay-200"></div>
                        <div className="absolute top-2/3 left-1/4 w-2 sm:w-3 h-2 sm:h-3 bg-blue-400 rounded-full animate-ping delay-300"></div>
                      </div>
                    )}
                  </div>
                  <p className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-base md:text-lg">
                    {animationEnabled 
                      ? "Colorful confetti will explode when the gift is opened" 
                      : "Static presentation with confetti design (animations disabled)"}
                  </p>
                </div>
              )}
              
              {selectedStyle === 'simple' && (
                <div className="text-center">
                  <div className="w-64 sm:w-80 md:w-96 h-40 sm:h-52 md:h-64 mx-auto bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl flex items-center justify-center border border-gray-600">
                    <div className="text-center">
                      <Gift className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 mx-auto mb-3 sm:mb-4 text-orange-400" />
                      <span className="text-2xl sm:text-3xl font-bold text-white">{giftData.cardValue} SAR</span>
                    </div>
                  </div>
                  <p className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-base md:text-lg">
                    Simple, elegant presentation without animations
                  </p>
                </div>
              )}
              
              {selectedMusic !== 'none' && (
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-base sm:text-lg text-gray-300 flex items-center">
                  <Music className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span>
                    {musicOptions.find(m => m.id === selectedMusic)?.preview}
                  </span>
                </div>
              )}
            </div>
            
            <div className="mt-4 sm:mt-6 flex justify-center">
              <button
                onClick={togglePreviewMode}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium text-white"
              >
                Return to Editor
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">Digital Wrapping <span className="text-orange-500">🎁</span></h2>
          <p className="text-gray-600 text-center mb-6 sm:mb-8 text-base sm:text-lg">
            Choose how your gift will be presented when opened
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Wrapping Styles & Animation Toggle */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg sm:text-xl font-medium mb-4 text-gray-700 flex items-center">
                  <Gift className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-500" />
                  Select Wrapping Style
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {wrappingStyles.map((style) => (
                    <div 
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`
                        p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 flex items-center
                        ${selectedStyle === style.id 
                          ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-400' 
                          : 'bg-white hover:bg-gray-50 border border-gray-200'}
                      `}
                    >
                      <div className={`p-2 sm:p-3 rounded-full mr-2 sm:mr-3 ${selectedStyle === style.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {style.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm sm:text-base">{style.name}</h4>
                        <p className="text-xs text-gray-500">
                          {style.id === 'envelope' ? 'An animated envelope that opens to reveal your gift' :
                           style.id === 'giftbox' ? 'A 3D gift box that unwraps with a satisfying animation' :
                           style.id === 'confetti' ? 'Colorful confetti explosion when the gift is opened' :
                           'Clean, minimal presentation without animations'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={animationEnabled}
                      onChange={() => setAnimationEnabled(!animationEnabled)}
                      className="sr-only peer"
                    />
                    <div className="relative w-10 sm:w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    <span className="ms-3 text-sm sm:text-base font-medium text-gray-700">Enable animations</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Music className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-500" />
                  <h3 className="text-lg sm:text-xl font-medium text-gray-700">Background Music</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {musicOptions.map((option) => (
                    <div 
                      key={option.id}
                      className="flex items-center"
                    >
                      <input
                        type="radio"
                        id={`music-${option.id}`}
                        name="music"
                        checked={selectedMusic === option.id}
                        onChange={() => setSelectedMusic(option.id)}
                        className="w-4 h-4 text-orange-500 bg-white border-gray-300 focus:ring-orange-500 focus:ring-2"
                      />
                      <label 
                        htmlFor={`music-${option.id}`}
                        className="ms-2 text-sm sm:text-base font-medium text-gray-700 flex-1 cursor-pointer"
                      >
                        {option.name}
                        <span className="block text-xs text-gray-500">{option.preview}</span>
                      </label>
                      
                      {option.id !== 'none' && (
                        <button className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">
                          Preview
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Preview */}
            <div className="lg:col-span-5">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium flex items-center text-gray-700">
                    <Sparkles className="w-5 h-5 mr-2 text-orange-500" />
                    Preview
                  </h3>
                  <button 
                    onClick={togglePreviewMode}
                    className="px-2 sm:px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs flex items-center text-white"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Full Screen
                  </button>
                </div>
                
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {selectedStyle === 'envelope' && (
                    <div className="text-center">
                      <div className="relative w-32 sm:w-40 h-24 sm:h-28 mx-auto bg-orange-500 rounded-lg transform rotate-3 shadow-lg">
                        <div className="absolute inset-1 bg-white rounded-lg flex items-center justify-center">
                          <span className="text-base sm:text-lg font-bold text-orange-500">{giftData.cardValue} SAR</span>
                        </div>
                        <div className={`absolute inset-0 bg-orange-400 rounded-lg flex items-center justify-center transition-transform duration-1000 ${animationEnabled ? 'animate-pulse' : ''}`}>
                          <Gift className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                        </div>
                      </div>
                      <p className="mt-2 sm:mt-3 text-gray-500 text-xs">
                        {animationEnabled 
                          ? "The envelope will animate open when your recipient views it" 
                          : "Static envelope presentation (animations disabled)"}
                      </p>
                    </div>
                  )}
                  
                  {selectedStyle === 'giftbox' && (
                    <div className="text-center">
                      <div className="relative w-24 sm:w-28 h-24 sm:h-28 mx-auto">
                        <div className="w-full h-full bg-blue-600 rounded-lg"></div>
                        <div className={`absolute top-0 left-0 w-full h-6 sm:h-7 bg-blue-500 rounded-t-lg transform origin-bottom ${animationEnabled ? 'animate-pulse' : ''}`}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm sm:text-base">
                          {giftData.cardValue} SAR
                        </div>
                      </div>
                      <p className="mt-2 sm:mt-3 text-gray-500 text-xs">
                        {animationEnabled 
                          ? "The gift box will unwrap with a 3D animation" 
                          : "Static gift box presentation (animations disabled)"}
                      </p>
                    </div>
                  )}
                  
                  {selectedStyle === 'confetti' && (
                    <div className="text-center">
                      <div className="relative w-32 sm:w-40 h-24 sm:h-28 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-base sm:text-lg font-bold text-white">{giftData.cardValue} SAR</span>
                        {animationEnabled && (
                          <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-0 left-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping"></div>
                            <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping delay-100"></div>
                            <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-200"></div>
                            <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping delay-300"></div>
                          </div>
                        )}
                      </div>
                      <p className="mt-2 sm:mt-3 text-gray-500 text-xs">
                        {animationEnabled 
                          ? "Colorful confetti will explode when the gift is opened" 
                          : "Static presentation with confetti design (animations disabled)"}
                      </p>
                    </div>
                  )}
                  
                  {selectedStyle === 'simple' && (
                    <div className="text-center">
                      <div className="w-32 sm:w-40 h-24 sm:h-28 mx-auto bg-white rounded-lg flex items-center justify-center border border-gray-300">
                        <div className="text-center">
                          <Gift className="w-6 sm:w-7 h-6 sm:h-7 mx-auto mb-1 sm:mb-2 text-orange-500" />
                          <span className="text-base sm:text-lg font-bold text-gray-700">{giftData.cardValue} SAR</span>
                        </div>
                      </div>
                      <p className="mt-2 sm:mt-3 text-gray-500 text-xs">
                        Simple, elegant presentation without animations
                      </p>
                    </div>
                  )}
                </div>
                
                {selectedMusic !== 'none' && (
                  <div className="mt-2 sm:mt-3 text-xs text-gray-500 flex items-center">
                    <Music className="w-3 h-3 mr-1" />
                     <span>
                      {musicOptions.find(m => m.id === selectedMusic)?.preview}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex justify-between">
            <button
              onClick={prevStep}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back
            </button>
            <button
              onClick={handleContinue}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500 flex items-center text-sm sm:text-base"
            >
              Continue
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default DigitalWrapping;