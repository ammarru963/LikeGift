import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Gift, Sparkles, Zap, Eye, Gamepad2, PartyPopper, Mail, Package } from 'lucide-react';
import { 
  FriendshipQuiz,
  FlappyBird,
  MazeOfGifts,
  CardMatching,
  DigitalScratchoff,
  TreasureHunt,
  WordScramble,
  PuzzleAssembly,
  BalloonPopChallenge,
  ReactionTimeChallenge
} from './games';

// Main wrapping options - simplified to two main categories as requested
const wrappingOptions = [
  {
    id: 'standard',
    name: 'تغليف عادي',
    description: 'تغليف هدية رقمي كلاسيكي',
    icon: <Gift size={24} className="text-blue-600" />,
    emoji: '🎁',
    preview: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    interactive: false
  },
  {
    id: 'interactive',
    name: 'ألعاب تفاعلية',
    description: 'ألعاب صغيرة ممتعة لفتح الهدية',
    icon: <Gamepad2 size={24} className="text-blue-600" />,
    emoji: '🎮',
    preview: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    interactive: true
  }
];

// Animation options for unwrapping
const animationOptions = [
  {
    id: 'none',
    name: 'بدون حركة',
    description: 'فتح عادي بدون تأثيرات',
    preview: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    icon: <Gift size={24} className="text-gray-600" />
  },
  {
    id: 'envelope',
    name: 'مظروف',
    description: 'تأثير فتح المظروف',
    preview: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    icon: <Mail size={24} className="text-blue-600" />
  },
  {
    id: 'confetti',
    name: 'كونفيتي',
    description: 'انفجار من الكونفيتي',
    preview: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    icon: <PartyPopper size={24} className="text-pink-600" />
  },
  {
    id: 'unwrap',
    name: 'فتح الهدية',
    description: 'تأثير فتح صندوق الهدية',
    preview: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    icon: <Package size={24} className="text-purple-600" />
  }
];

// Interactive game options
const interactiveOptions = [
  { 
    id: 'friendship_quiz', 
    name: 'اختبار الصداقة', 
    emoji: '❓', 
    description: 'اختبار عن مدى معرفتك بصديقك',
    preview: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    component: FriendshipQuiz
  },
  { 
    id: 'flappy_bird', 
    name: 'لعبة الهدايا الطائرة', 
    emoji: '🎮', 
    description: 'تحكم بهدية طائرة وتجنب العوائق',
    preview: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    component: FlappyBird
  },
  { 
    id: 'maze', 
    name: 'متاهة الهدايا', 
    emoji: '🧩', 
    description: 'تنقل في المتاهة للوصول إلى الهدية',
    preview: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    component: MazeOfGifts
  },
  { 
    id: 'card_matching', 
    name: 'لعبة مطابقة البطاقات', 
    emoji: '🃏', 
    description: 'اعثر على الأزواج المتطابقة',
    preview: 'https://images.unsplash.com/photo-1606326608690-4e0281b1e588?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    component: CardMatching
  },
  { 
    id: 'scratch', 
    name: 'بطاقة الخدش التفاعلية', 
    emoji: '🎯', 
    description: 'اخدش البطاقة لكشف الهدية',
    preview: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    component: DigitalScratchoff
  },
  { 
    id: 'treasure_hunt', 
    name: 'لعبة البحث عن الكنز', 
    emoji: '🗺️', 
    description: 'اتبع الدلائل للعثور على الهدية',
    preview: 'https://images.unsplash.com/photo-1596778402202-41a6a481bcf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    component: TreasureHunt
  },
  { 
    id: 'word_scramble', 
    name: 'لعبة ترتيب الكلمات', 
    emoji: '📝', 
    description: 'رتب الحروف لتكوين الكلمة الصحيحة',
    preview: 'https://images.unsplash.com/photo-1591492654773-6756035a0e66?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    component: WordScramble
  },
  { 
    id: 'puzzle', 
    name: 'لعبة تركيب الصور', 
    emoji: '🧩', 
    description: 'رتب القطع لتكوين الصورة الكاملة',
    preview: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    component: PuzzleAssembly
  },
  { 
    id: 'balloon', 
    name: 'تحدي فرقعات البالونات', 
    emoji: '🎈', 
    description: 'افرقع البالونات للعثور على الهدية',
    preview: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    component: BalloonPopChallenge
  },
  { 
    id: 'reaction', 
    name: 'تحدي سرعة التفاعل', 
    emoji: '⚡', 
    description: 'اختبر سرعة تفاعلك',
    preview: 'https://images.unsplash.com/photo-1533561052604-c3beb6d55b8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    component: ReactionTimeChallenge
  }
];

// Template designs for different occasions
const occasionTemplates = [
  {
    id: 'birthday',
    name: 'عيد ميلاد',
    emoji: '🎂',
    preview: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'wedding',
    name: 'زفاف',
    emoji: '💍',
    preview: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'graduation',
    name: 'تخرج',
    emoji: '🎓',
    preview: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'holiday',
    name: 'عطلة',
    emoji: '🎄',
    preview: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'love',
    name: 'حب',
    emoji: '❤️',
    preview: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'thankyou',
    name: 'شكراً',
    emoji: '🙏',
    preview: 'https://images.unsplash.com/photo-1499744937866-d7e566a20a61?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  }
];

const DigitalWrapping = ({ giftCardData, updateGiftCardData, nextStep, prevStep }) => {
  const [selectedWrapping, setSelectedWrapping] = useState(giftCardData.wrapping?.style || 'standard');
  const [selectedInteractive, setSelectedInteractive] = useState(giftCardData.wrapping?.interactive || null);
  const [selectedAnimation, setSelectedAnimation] = useState(giftCardData.wrapping?.animation || 'none');
  const [showGameDemo, setShowGameDemo] = useState(false);
  const [demoGame, setDemoGame] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAnimations, setShowAnimations] = useState(false);
  const [gameProgress, setGameProgress] = useState(0);
  
  // Floating emojis for decoration
  const floatingEmojis = ['🎁', '🎉', '🎊', '✨', '🎈', '🎀', '🎇', '🎆'];
  
  useEffect(() => {
    // Reset interactive selection when wrapping type changes
    if (selectedWrapping !== 'interactive') {
      setSelectedInteractive(null);
      setShowGameDemo(false);
      setDemoGame(null);
    }
  }, [selectedWrapping]);
  
  const handleWrappingSelect = (wrappingId) => {
    setSelectedWrapping(wrappingId);
  };

  const handleInteractiveSelect = (interactiveId) => {
    setSelectedInteractive(interactiveId);
    setShowGameDemo(false);
    setDemoGame(null);
    setGameProgress(0);
  };

  const handleAnimationSelect = (animationId) => {
    setSelectedAnimation(animationId);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleGameDemo = (gameId) => {
    setDemoGame(gameId);
    setShowGameDemo(true);
    setGameProgress(0);
  };

  const handleGameComplete = () => {
    // This function will be called when the game is completed
    setTimeout(() => {
      setShowGameDemo(false);
    }, 2000);
  };

  const handleGameProgress = (increment) => {
    setGameProgress(prev => Math.min(100, prev + increment));
  };

  const handleSubmit = () => {
    updateGiftCardData({
      wrapping: {
        style: selectedWrapping,
        interactive: selectedWrapping === 'interactive' ? selectedInteractive : null,
        animation: selectedAnimation,
        template: selectedTemplate?.id || null
      }
    });
    nextStep();
  };

  const selectedWrappingOption = wrappingOptions.find(w => w.id === selectedWrapping);
  const selectedGameOption = interactiveOptions.find(g => g.id === selectedInteractive);
  const selectedAnimationOption = animationOptions.find(a => a.id === selectedAnimation);

  return (
    <div className="space-y-8 relative">
      {/* Floating emojis decoration */}
      {floatingEmojis.map((emoji, index) => (
        <div 
          key={index}
          className={`absolute text-2xl animate-float-${index % 5 + 1} z-10`}
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 90}%`,
            animationDelay: `${index * 0.5}s`
          }}
        >
          {emoji}
        </div>
      ))}
      
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center text-right">
          <span className="text-3xl ml-2">🎁</span>
          اختر تغليف الهدية الرقمي
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wrappingOptions.map((option) => (
            <div
              key={option.id}
              className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:transform hover:scale-105 ${
                selectedWrapping === option.id
                  ? 'border-2 border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => handleWrappingSelect(option.id)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={option.preview} 
                  alt={option.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-3xl animate-bounce-slow">{option.emoji}</span>
                  <h4 className="font-semibold text-gray-800 text-xl">{option.name}</h4>
                </div>
                <p className="text-gray-600">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowAnimations(!showAnimations)}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
          >
            {showAnimations ? 'إخفاء الحركات' : 'عرض حركات الفتح'}
          </button>
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <span className="text-3xl ml-2">🎬</span>
            اختر حركة فتح الهدية
          </h3>
        </div>
        
        {showAnimations && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {animationOptions.map((animation) => (
              <div
                key={animation.id}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:transform hover:scale-105 ${
                  selectedAnimation === animation.id
                    ? 'border-2 border-blue-500 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => handleAnimationSelect(animation.id)}
              >
                <div className="h-32 overflow-hidden">
                  <img 
                    src={animation.preview} 
                    alt={animation.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 flex flex-col items-center">
                  <div className="mb-2">
                    {animation.icon}
                  </div>
                  <h4 className="font-medium text-gray-800 text-center">{animation.name}</h4>
                  <p className="text-xs text-gray-600 text-center mt-1">{animation.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedWrapping === 'interactive' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="text-3xl ml-2">🎮</span>
              اختر اللعبة التفاعلية
            </h3>
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
            >
              {showTemplates ? 'إخفاء القوالب' : 'عرض قوالب المناسبات'}
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interactiveOptions.map((option) => (
              <div
                key={option.id}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:transform hover:scale-105 ${
                  selectedInteractive === option.id
                    ? 'border-2 border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => handleInteractiveSelect(option.id)}
              >
                <div className="h-36 overflow-hidden">
                  <img 
                    src={option.preview} 
                    alt={option.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl animate-pulse-slow">{option.emoji}</span>
                    <h4 className="font-semibold text-gray-800">{option.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 text-center">{option.description}</p>
                  <div className="mt-3 flex justify-center">
                    <button 
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGameDemo(option.id);
                      }}
                    >
                      تجربة اللعبة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {showTemplates && (
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center text-right">
            <span className="text-2xl ml-2">🎨</span>
            قوالب المناسبات
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {occasionTemplates.map((template) => (
              <div
                key={template.id}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:transform hover:scale-105 ${
                  selectedTemplate?.id === template.id
                    ? 'border-2 border-blue-500 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="h-32 overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={template.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 flex items-center justify-center space-x-2">
                  <span className="text-2xl">{template.emoji}</span>
                  <h4 className="font-medium text-gray-800">{template.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showGameDemo && demoGame && (
        <div className="bg-white rounded-lg p-6 border border-blue-200 shadow-md relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <span className="text-2xl ml-2">{selectedGameOption?.emoji}</span>
              {selectedGameOption?.name} تجربة
            </h3>
            <button
              onClick={() => setShowGameDemo(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center py-4 relative">
            {selectedGameOption?.component && React.createElement(selectedGameOption.component, {
              onComplete: handleGameComplete,
              onProgress: handleGameProgress
            })}
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">تقدم اللعبة:</span>
              <span className="text-sm font-medium text-blue-600">{Math.round(gameProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${gameProgress}%` }}
              ></div>
            </div>
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            هذه تجربة لكيفية تفاعل المستلم مع هديتك. جربها!
          </p>
        </div>
      )}

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Sparkles size={20} className="text-blue-500" />
          </div>
          <div className="mr-3 text-right">
            <h4 className="text-sm font-medium text-blue-800">معاينة التغليف الخاص بك</h4>
            <p className="mt-1 text-sm text-blue-600">
              {selectedWrappingOption?.emoji} {selectedWrappingOption?.name} 
              {selectedWrapping === 'interactive' && selectedInteractive && 
                ` مع ${selectedGameOption?.emoji} ${selectedGameOption?.name}`
              }
              {selectedAnimation !== 'none' && 
                ` وحركة ${selectedAnimationOption?.name}`
              }
              {selectedTemplate && 
                ` باستخدام قالب ${selectedTemplate.emoji} ${selectedTemplate.name}`
              }
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100"
          >
            <ChevronLeft size={18} />
            <span>رجوع</span>
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 transition"
          >
            <span>متابعة إلى التوصيل</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalWrapping;