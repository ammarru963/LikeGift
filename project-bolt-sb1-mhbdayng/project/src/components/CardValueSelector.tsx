import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Gift, Music, Gamepad, Zap, Phone, ShoppingBag } from 'lucide-react';

const cardValues = [
  { value: 50, popular: false },
  { value: 100, popular: true },
  { value: 200, popular: false },
  { value: 300, popular: false },
  { value: 500, popular: true },
  { value: 1000, popular: false },
];

const cardTypes = [
  { 
    id: 'likecard', 
    name: 'LikeCard Balance', 
    icon: <ShoppingBag className="w-6 h-6" />, 
    description: 'Use for any purchase on LikeCard platform',
    bgColor: 'from-blue-500 to-purple-600',
    textColor: 'text-blue-600',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'itunes', 
    name: 'iTunes', 
    icon: <Music className="w-6 h-6" />, 
    description: 'For App Store, iTunes, and Apple services',
    bgColor: 'from-pink-500 to-red-600',
    textColor: 'text-pink-600',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'playstation', 
    name: 'PlayStation', 
    icon: <Gamepad className="w-6 h-6" />, 
    description: 'For PlayStation Store purchases and subscriptions',
    bgColor: 'from-blue-600 to-indigo-700',
    textColor: 'text-blue-700',
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'xbox', 
    name: 'XBOX', 
    icon: <Gamepad className="w-6 h-6" />, 
    description: 'For Xbox games and Microsoft Store purchases',
    bgColor: 'from-green-500 to-green-700',
    textColor: 'text-green-600',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'steam', 
    name: 'STEAM', 
    icon: <Gamepad className="w-6 h-6" />, 
    description: 'For PC games and software on Steam',
    bgColor: 'from-gray-700 to-gray-900',
    textColor: 'text-gray-700',
    image: 'https://images.unsplash.com/photo-1616499370260-485b3e5ed3bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'pubg', 
    name: 'PUBG', 
    icon: <Zap className="w-6 h-6" />, 
    description: 'For in-game purchases and battle passes',
    bgColor: 'from-yellow-500 to-orange-600',
    textColor: 'text-yellow-600',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'stc', 
    name: 'STC', 
    icon: <Phone className="w-6 h-6" />, 
    description: 'For STC services and mobile recharges',
    bgColor: 'from-purple-500 to-indigo-600',
    textColor: 'text-purple-600',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
];

const CardValueSelector = ({ giftData, updateGiftData, nextStep, prevStep }) => {
  const [selectedCardType, setSelectedCardType] = useState(giftData.cardType || 'likecard');
  const [selectedValue, setSelectedValue] = useState(giftData.cardValue || null);
  const [isCardAnimating, setIsCardAnimating] = useState(false);

  // Find the selected card type object
  const selectedCardTypeObj = cardTypes.find(card => card.id === selectedCardType) || cardTypes[0];

  useEffect(() => {
    // Trigger card animation when card type changes
    if (selectedCardType) {
      setIsCardAnimating(true);
      const timer = setTimeout(() => {
        setIsCardAnimating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedCardType]);

  const handleValueSelect = (value) => {
    setSelectedValue(value);
    updateGiftData({ cardValue: value });
  };

  const handleCardTypeSelect = (cardTypeId) => {
    setSelectedCardType(cardTypeId);
    updateGiftData({ cardType: cardTypeId });
  };

  const handleContinue = () => {
    if (selectedValue) {
      nextStep();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-4"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">Select Card Value <span className="text-orange-500">💰</span></h2>
      <p className="text-gray-600 text-center mb-6 sm:mb-8 text-base sm:text-lg">
        Choose how much you'd like to gift for the {giftData.occasionEmoji} {giftData.occasion.charAt(0).toUpperCase() + giftData.occasion.slice(1)}
      </p>
      
      {/* Gift Card Preview */}
      <div className="mb-10 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCardType}
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: isCardAnimating ? [0, 15, 0, -15, 0] : 0 
            }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ 
              duration: 0.6,
              rotateY: { duration: 0.8, times: [0, 0.25, 0.5, 0.75, 1] }
            }}
            className={`relative w-full max-w-md h-56 sm:h-64 rounded-2xl overflow-hidden shadow-xl transform-gpu perspective-1000`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${selectedCardTypeObj.bgColor}`}></div>
            
            {/* Card background image with overlay */}
            <div className="absolute inset-0 opacity-30">
              <img 
                src={selectedCardTypeObj.image} 
                alt={selectedCardTypeObj.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Card content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-white bg-opacity-90 p-2 rounded-lg">
                  {selectedCardTypeObj.icon}
                </div>
                <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full">
                  <span className="font-bold text-sm">GIFT CARD</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Gift className="w-6 h-6 text-white mr-2" />
                  <h3 className="text-white font-bold text-xl">{selectedCardTypeObj.name}</h3>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white text-opacity-80 text-sm mb-1">Balance</p>
                    <p className="text-white font-bold text-3xl">
                      {selectedValue ? `${selectedValue} SAR` : '---'}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-1 bg-white bg-opacity-60 rounded-full"></div>
                      ))}
                    </div>
                    <p className="text-white text-opacity-80 text-xs mt-2">Valid thru 12/25</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Animated shine effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                initial={{ x: '-100%', y: '-100%' }}
                animate={{ x: '200%', y: '200%' }}
                transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
                className="w-1/3 h-full bg-gradient-to-br from-transparent via-white to-transparent opacity-30 transform rotate-45"
              ></motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Card Type Selection */}
      <div className="mb-10">
        <h3 className="text-lg sm:text-xl font-medium mb-4 text-gray-700 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-orange-500" />
          Select Card Type
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {cardTypes.map((cardType) => (
            <motion.div 
              key={cardType.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardTypeSelect(cardType.id)}
              className={`
                p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 border
                ${selectedCardType === cardType.id 
                  ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-400 shadow-sm' 
                  : 'bg-white hover:bg-gray-50 border-gray-200'}
              `}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${selectedCardType === cardType.id ? 'bg-orange-100' : 'bg-gray-100'}`}>
                  <div className={selectedCardType === cardType.id ? 'text-orange-500' : cardType.textColor}>
                    {cardType.icon}
                  </div>
                </div>
                <span className="font-medium text-sm">{cardType.name}</span>
                <span className="text-xs text-gray-500 mt-1 hidden sm:block">{cardType.description}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Card Value Selection */}
      <div>
        <h3 className="text-lg sm:text-xl font-medium mb-4 text-gray-700 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-orange-500" />
          Select Card Value
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {cardValues.map((card) => (
            <motion.div 
              key={card.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleValueSelect(card.value)}
              className={`
                relative p-3 sm:p-4 md:p-5 rounded-lg cursor-pointer transition-all duration-300 border
                ${selectedValue === card.value 
                  ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-400 shadow-md' 
                  : 'bg-white hover:bg-gray-50 border-gray-200'}
              `}
            >
              {card.popular && (
                <div className="absolute -top-2 -right-2 bg-orange-500 text-xs font-bold px-2 py-1 rounded-full text-white">
                  POPULAR
                </div>
              )}
              <div className="flex flex-col items-center justify-center py-2 sm:py-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${selectedValue === card.value ? 'bg-orange-100 text-orange-500' : 'bg-gray-100 text-gray-500'}`}>
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="text-lg sm:text-xl md:text-2xl font-bold">{card.value} SAR</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 sm:mt-10 flex justify-between">
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
          disabled={!selectedValue}
          className={`
            px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center text-sm sm:text-base
            ${selectedValue 
              ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
          `}
        >
          Continue
          <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default CardValueSelector;