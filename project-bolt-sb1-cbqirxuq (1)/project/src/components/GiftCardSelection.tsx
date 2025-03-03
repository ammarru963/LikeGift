import React, { useState } from 'react';
import { ChevronRight, DollarSign, Gift, ShoppingBag, Coffee, Music, Home, Car, Utensils, Gamepad, Plane } from 'lucide-react';

const giftCardOptions = [
  {
    id: 'amazon',
    name: 'Amazon',
    emoji: '🛒',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    icon: <ShoppingBag size={24} className="text-blue-500" />
  },
  {
    id: 'netflix',
    name: 'Netflix',
    emoji: '🎬',
    logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    icon: <Gift size={24} className="text-red-500" />
  },
  {
    id: 'spotify',
    name: 'Spotify',
    emoji: '🎵',
    logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    icon: <Music size={24} className="text-green-500" />
  },
  {
    id: 'starbucks',
    name: 'Starbucks',
    emoji: '☕',
    logo: 'https://images.unsplash.com/photo-1507226983735-a838615193b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    icon: <Coffee size={24} className="text-emerald-500" />
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    emoji: '🏠',
    logo: 'https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    icon: <Home size={24} className="text-pink-500" />
  },
  {
    id: 'uber',
    name: 'Uber',
    emoji: '🚗',
    logo: 'https://images.unsplash.com/photo-1568096889942-6eedde686635?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-600',
    icon: <Car size={24} className="text-gray-500" />
  },
  {
    id: 'doordash',
    name: 'DoorDash',
    emoji: '🍔',
    logo: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    icon: <Utensils size={24} className="text-red-500" />
  },
  {
    id: 'steam',
    name: 'Steam',
    emoji: '🎮',
    logo: 'https://images.unsplash.com/photo-1616499370260-485b3e5ed3bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    icon: <Gamepad size={24} className="text-indigo-500" />
  },
  {
    id: 'expedia',
    name: 'Expedia',
    emoji: '✈️',
    logo: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    icon: <Plane size={24} className="text-yellow-500" />
  }
];

const amountOptions = [10, 25, 50, 100, 200];

const GiftCardSelection = ({ giftCardData, updateGiftCardData, nextStep }) => {
  const [selectedCard, setSelectedCard] = useState(giftCardData.selectedCard || null);
  const [amount, setAmount] = useState(giftCardData.amount || 25);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientName, setRecipientName] = useState(giftCardData.recipient?.name || '');
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'carousel'

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handleAmountSelect = (value) => {
    setAmount(value);
    setIsCustomAmount(false);
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setCustomAmount(value);
      if (value !== '') {
        setAmount(parseInt(value, 10));
      }
    }
  };

  const handleSubmit = () => {
    updateGiftCardData({
      selectedCard,
      amount,
      recipient: {
        ...giftCardData.recipient,
        name: recipientName
      }
    });
    nextStep();
  };

  const isNextDisabled = !selectedCard || !amount || amount <= 0 || !recipientName;

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'carousel' : 'grid');
  };

  const renderGridView = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {giftCardOptions.map((card) => (
        <div
          key={card.id}
          className={`border rounded-lg p-4 cursor-pointer transition-all hover:transform hover:scale-105 ${
            selectedCard?.id === card.id
              ? `border-2 ${card.textColor} ${card.bgColor} shadow-md`
              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
          }`}
          onClick={() => handleCardSelect(card)}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className={`w-16 h-16 rounded-full ${card.bgColor} flex items-center justify-center`}>
              <span className="text-3xl">{card.emoji}</span>
            </div>
            <div className="text-center">
              <span className={`font-medium ${selectedCard?.id === card.id ? card.textColor : 'text-gray-700'}`}>
                {card.name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCarouselView = () => (
    <div className="relative overflow-hidden py-4">
      <div className="flex space-x-4 overflow-x-auto pb-4 snap-x">
        {giftCardOptions.map((card) => (
          <div
            key={card.id}
            className={`flex-shrink-0 w-40 snap-center border rounded-lg p-4 cursor-pointer transition-all ${
              selectedCard?.id === card.id
                ? `border-2 ${card.textColor} ${card.bgColor} shadow-md`
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
            onClick={() => handleCardSelect(card)}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`w-16 h-16 rounded-full ${card.bgColor} flex items-center justify-center`}>
                <span className="text-3xl">{card.emoji}</span>
              </div>
              <span className={`font-medium ${selectedCard?.id === card.id ? card.textColor : 'text-gray-700'}`}>
                {card.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Choose a Gift Card</h3>
          <button
            onClick={toggleViewMode}
            className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
          >
            {viewMode === 'grid' ? 'Carousel View' : 'Grid View'}
          </button>
        </div>
        
        {viewMode === 'grid' ? renderGridView() : renderCarouselView()}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Amount</h3>
        <div className="flex flex-wrap gap-3 mb-4">
          {amountOptions.map((value) => (
            <button
              key={value}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                amount === value && !isCustomAmount
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleAmountSelect(value)}
            >
              ${value}
            </button>
          ))}
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isCustomAmount
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setIsCustomAmount(true)}
          >
            Custom
          </button>
        </div>
        
        {isCustomAmount && (
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="Enter amount"
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recipient Information</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
              Recipient's Name
            </label>
            <input
              type="text"
              id="recipientName"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Enter recipient's name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {selectedCard && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-3">Selected Gift Card</h4>
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full ${selectedCard.bgColor} flex items-center justify-center`}>
              <span className="text-2xl">{selectedCard.emoji}</span>
            </div>
            <div>
              <h5 className="font-medium text-gray-800">{selectedCard.name}</h5>
              <p className="text-sm text-gray-600">Perfect for online shopping</p>
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Selected Amount:</p>
            <p className="text-2xl font-bold text-gray-800">${amount}</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isNextDisabled}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium ${
              isNextDisabled
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <span>Continue to Personalize</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftCardSelection;