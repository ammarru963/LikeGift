import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, Gift, Lightbulb, RefreshCw, Check, ThumbsUp, ThumbsDown } from 'lucide-react';

// Mock AI suggestion data - in a real app, this would come from an API
const mockAISuggestions = {
  messages: {
    birthday: [
      "Happy birthday! Hope your day is filled with joy and laughter!",
      "Wishing you a fantastic birthday filled with wonderful surprises!",
      "Another trip around the sun! May this year bring you happiness and success!"
    ],
    congratulations: [
      "Congratulations on your amazing achievement! So proud of you!",
      "Well done! Your hard work and dedication have truly paid off!",
      "Congratulations! This is just the beginning of your success story!"
    ],
    thankyou: [
      "Thank you so much for everything you've done. I truly appreciate it!",
      "Your kindness means the world to me. Thank you!",
      "I'm so grateful for your help and support. Thank you!"
    ],
    holiday: [
      "Wishing you a joyful holiday season filled with love and happiness!",
      "May your holidays be merry and bright!",
      "Season's greetings! Wishing you peace and joy this holiday season!"
    ],
    wedding: [
      "Congratulations on your wedding! Wishing you a lifetime of love and happiness!",
      "Here's to a beautiful beginning of your journey together!",
      "May your marriage be filled with all the right ingredients: love, laughter, and happiness!"
    ],
    graduation: [
      "Congratulations on your graduation! The world is yours to conquer!",
      "Your hard work has paid off! Congratulations on this well-deserved success!",
      "As you graduate, remember that this is just the beginning of your journey!"
    ],
    celebration: [
      "Here's to celebrating this special occasion! Cheers to many more!",
      "Congratulations on this wonderful milestone! Time to celebrate!",
      "Raising a virtual toast to you on this special day! Celebrate in style!"
    ],
    love: [
      "Sending you all my love today and always!",
      "You mean the world to me. I love you more than words can express!",
      "My heart is yours, today and forever. I love you!"
    ]
  },
  giftCards: [
    { id: 'amazon', name: 'Amazon', reason: 'Most versatile option with millions of products' },
    { id: 'netflix', name: 'Netflix', reason: 'Perfect for entertainment lovers' },
    { id: 'spotify', name: 'Spotify', reason: 'Great for music enthusiasts' },
    { id: 'starbucks', name: 'Starbucks', reason: 'Ideal for coffee lovers' },
    { id: 'airbnb', name: 'Airbnb', reason: 'Perfect for those who love to travel' },
    { id: 'uber', name: 'Uber', reason: 'Practical for everyday transportation needs' }
  ]
};

const AIPersonalization = ({ occasion, recipient, onSelectMessage, onSelectGiftCard }) => {
  const [suggestedMessages, setSuggestedMessages] = useState([]);
  const [suggestedGiftCards, setSuggestedGiftCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackGiven, setFeedbackGiven] = useState({});

  useEffect(() => {
    // Simulate API call delay
    setIsLoading(true);
    setTimeout(() => {
      // Get message suggestions based on occasion
      const occasionKey = occasion || 'birthday';
      const messages = mockAISuggestions.messages[occasionKey] || mockAISuggestions.messages.birthday;
      
      // Personalize messages with recipient name if available
      const personalizedMessages = recipient?.name 
        ? messages.map(msg => msg.replace('you', recipient.name).replace('your', `${recipient.name}'s`))
        : messages;
      
      setSuggestedMessages(personalizedMessages);
      
      // Get gift card suggestions
      // In a real app, this would use recipient preferences, past purchases, etc.
      const shuffled = [...mockAISuggestions.giftCards].sort(() => 0.5 - Math.random());
      setSuggestedGiftCards(shuffled.slice(0, 3));
      
      setIsLoading(false);
    }, 1200);
  }, [occasion, recipient]);

  const handleRefreshSuggestions = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Shuffle the messages
      const occasionKey = occasion || 'birthday';
      const messages = mockAISuggestions.messages[occasionKey] || mockAISuggestions.messages.birthday;
      const shuffledMessages = [...messages].sort(() => 0.5 - Math.random());
      
      // Personalize messages with recipient name if available
      const personalizedMessages = recipient?.name 
        ? shuffledMessages.map(msg => msg.replace('you', recipient.name).replace('your', `${recipient.name}'s`))
        : shuffledMessages;
      
      setSuggestedMessages(personalizedMessages);
      
      // Shuffle gift card suggestions
      const shuffledCards = [...mockAISuggestions.giftCards].sort(() => 0.5 - Math.random());
      setSuggestedGiftCards(shuffledCards.slice(0, 3));
      
      setIsLoading(false);
    }, 800);
  };

  const handleFeedback = (id, isPositive) => {
    setFeedbackGiven(prev => ({
      ...prev,
      [id]: isPositive
    }));
    
    // In a real app, this would send feedback to the AI system to improve future suggestions
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles size={20} className="text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">AI-Powered Suggestions</h3>
        </div>
        <button
          onClick={handleRefreshSuggestions}
          disabled={isLoading}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 disabled:opacity-50"
        >
          <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-pulse flex space-x-2 items-center mb-4">
            <Sparkles size={24} className="text-blue-400" />
            <div className="h-4 w-48 bg-blue-100 rounded"></div>
          </div>
          <p className="text-sm text-gray-500">Generating personalized suggestions...</p>
        </div>
      ) : (
        <>
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3 flex items-center">
              <MessageSquare size={16} className="text-blue-600 mr-2" />
              Suggested Messages
            </h4>
            <div className="space-y-3">
              {suggestedMessages.map((message, index) => (
                <div 
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:bg-blue-50 transition cursor-pointer relative group"
                  onClick={() => onSelectMessage(message)}
                >
                  <p className="text-gray-700 pr-16">{message}</p>
                  <div className="absolute right-3 top-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition">
                    <button 
                      className={`p-1 rounded-full ${feedbackGiven[`msg-${index}`] === true ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeedback(`msg-${index}`, true);
                      }}
                    >
                      <ThumbsUp size={14} />
                    </button>
                    <button 
                      className={`p-1 rounded-full ${feedbackGiven[`msg-${index}`] === false ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeedback(`msg-${index}`, false);
                      }}
                    >
                      <ThumbsDown size={14} />
                    </button>
                  </div>
                  <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition">
                    <button 
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                      onClick={() => onSelectMessage(message)}
                    >
                      Use This
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3 flex items-center">
              <Gift size={16} className="text-blue-600 mr-2" />
              Recommended Gift Cards
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {suggestedGiftCards.map((card, index) => (
                <div 
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:bg-blue-50 transition cursor-pointer"
                  onClick={() => onSelectGiftCard(card.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <h5 className="font-medium text-gray-800 mb-1">{card.name}</h5>
                    <p className="text-xs text-gray-600 mb-2">{card.reason}</p>
                    <div className="mt-2">
                      <button 
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                        onClick={() => onSelectGiftCard(card.id)}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      
      <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <Lightbulb size={16} className="text-blue-600" />
          </div>
          <div className="ml-3">
            <p className="text-xs text-blue-700">
              Our AI analyzes recipient preferences and occasion to suggest personalized messages and gift cards. Your feedback helps improve future suggestions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPersonalization;