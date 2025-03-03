import React from 'react';
import { motion } from 'framer-motion';

const occasions = [
  { id: 'birthday', name: 'Birthday', emoji: '🎉' },
  { id: 'graduation', name: 'Graduation', emoji: '🎓' },
  { id: 'wedding', name: 'Wedding', emoji: '💍' },
  { id: 'newBaby', name: 'New Baby', emoji: '👶' },
  { id: 'anniversary', name: 'Anniversary', emoji: '💝' },
  { id: 'holiday', name: 'Holiday', emoji: '🎄' },
  { id: 'congratulations', name: 'Congratulations', emoji: '🎊' },
  { id: 'thankyou', name: 'Thank You', emoji: '🙏' },
  { id: 'getwell', name: 'Get Well', emoji: '🩹' },
  { id: 'newjob', name: 'New Job', emoji: '💼' },
  { id: 'newhome', name: 'New Home', emoji: '🏠' },
  { id: 'custom', name: 'Custom', emoji: '✨' }
];

const OccasionSelector = ({ giftData, updateGiftData, nextStep }) => {
  const handleOccasionSelect = (occasion, emoji) => {
    updateGiftData({ 
      occasion: occasion,
      occasionEmoji: emoji
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-4"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">Choose an Occasion <span className="text-orange-500">✨</span></h2>
      <p className="text-gray-600 text-center mb-8 sm:mb-10 text-base sm:text-lg">What are we celebrating today?</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {occasions.map((occasion) => (
          <div 
            key={occasion.id}
            onClick={() => handleOccasionSelect(occasion.id, occasion.emoji)}
            className={`
              p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105
              ${giftData.occasion === occasion.id 
                ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-400 shadow-lg' 
                : 'bg-white hover:bg-gray-50 border border-gray-200'}
            `}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">{occasion.emoji}</span>
              <span className="font-medium text-sm sm:text-base">{occasion.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 flex justify-end">
        <button
          onClick={nextStep}
          disabled={!giftData.occasion}
          className={`
            px-5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-medium flex items-center text-base sm:text-lg
            ${giftData.occasion 
              ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
          `}
        >
          Continue
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default OccasionSelector;