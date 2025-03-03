import React, { useState } from 'react';
import { Gift, CreditCard, Send, Palette, Sparkles, Gamepad2 } from 'lucide-react';
import OccasionSelector from './components/OccasionSelector';
import CardValueSelector from './components/CardValueSelector';
import CardDesigner from './components/CardDesigner';
import DigitalWrapping from './components/DigitalWrapping';
import GameSelector from './components/GameSelector';
import DeliveryOptions from './components/DeliveryOptions';
import Preview from './components/Preview';
import Header from './components/Header';

function App() {
  const [step, setStep] = useState(1);
  const [giftData, setGiftData] = useState({
    occasion: '',
    occasionEmoji: '',
    cardValue: 0,
    cardType: 'likecard',
    designTemplate: '',
    customImage: null,
    customizations: {
      recipientName: '',
      message: '',
      tone: 'friendly',
      relationship: '',
    },
    wrapping: {
      style: 'envelope',
      animation: true,
      music: '',
    },
    games: [],
    delivery: {
      method: 'whatsapp',
      recipientContact: '',
      senderName: '',
    }
  });

  const updateGiftData = (data) => {
    setGiftData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    window.scrollTo(0, 0);
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <OccasionSelector 
          giftData={giftData} 
          updateGiftData={updateGiftData} 
          nextStep={nextStep} 
        />;
      case 2:
        return <CardValueSelector 
          giftData={giftData} 
          updateGiftData={updateGiftData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />;
      case 3:
        return <CardDesigner 
          giftData={giftData} 
          updateGiftData={updateGiftData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />;
      case 4:
        return <DigitalWrapping 
          giftData={giftData} 
          updateGiftData={updateGiftData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />;
      case 5:
        return <GameSelector 
          giftData={giftData} 
          updateGiftData={updateGiftData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />;
      case 6:
        return <DeliveryOptions 
          giftData={giftData} 
          updateGiftData={updateGiftData} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />;
      case 7:
        return <Preview 
          giftData={giftData} 
          prevStep={prevStep} 
        />;
      default:
        return <OccasionSelector 
          giftData={giftData} 
          updateGiftData={updateGiftData} 
          nextStep={nextStep} 
        />;
    }
  };

  const getStepIcon = (stepNumber) => {
    switch (stepNumber) {
      case 1: return <Gift className="w-4 h-4 md:w-5 md:h-5" />;
      case 2: return <CreditCard className="w-4 h-4 md:w-5 md:h-5" />;
      case 3: return <Palette className="w-4 h-4 md:w-5 md:h-5" />;
      case 4: return <Sparkles className="w-4 h-4 md:w-5 md:h-5" />;
      case 5: return <Gamepad2 className="w-4 h-4 md:w-5 md:h-5" />;
      case 6: return <Send className="w-4 h-4 md:w-5 md:h-5" />;
      case 7: return <Gift className="w-4 h-4 md:w-5 md:h-5" />;
      default: return <Gift className="w-4 h-4 md:w-5 md:h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Progress Indicator */}
        <div className="mb-8 sm:mb-12 max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div 
                key={num} 
                className={`flex flex-col items-center ${step === num ? 'text-orange-500' : 'text-gray-400'}`}
              >
                <div 
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full mb-2 
                    ${step === num ? 'bg-orange-500 text-white' : 
                      step > num ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                >
                  {step > num ? '✓' : getStepIcon(num)}
                </div>
                <span className="text-xs md:text-sm hidden sm:block">
                  {num === 1 ? 'Occasion' : 
                   num === 2 ? 'Value' : 
                   num === 3 ? 'Design' : 
                   num === 4 ? 'Wrapping' : 
                   num === 5 ? 'Games' : 
                   num === 6 ? 'Delivery' : 'Preview'}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-4">
            <div className="absolute top-0 left-0 h-2 bg-gray-200 w-full rounded-full"></div>
            <div 
              className="absolute top-0 left-0 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-gray-200">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

export default App;