import React, { useState, useEffect, useRef } from 'react';
import { X, Gift, Sparkles, Zap, MessageCircle, Image as ImageIcon, Video as VideoIcon, ChevronLeft, ChevronRight, RefreshCw, Gamepad2, PartyPopper, Mail, Package } from 'lucide-react';

const GiftPreview = ({ giftCardData, onClose }) => {
  const [isUnwrapping, setIsUnwrapping] = useState(false);
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [activeDevice, setActiveDevice] = useState('mobile');
  const [interactionProgress, setInteractionProgress] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [viewMode, setViewMode] = useState('recipient'); // 'recipient' or 'sender'
  const [scratchedCells, setScratchedCells] = useState(Array(25).fill(false));
  const [puzzlePieces, setPuzzlePieces] = useState(Array(9).fill(false));
  const [spinRotation, setSpinRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [balloons, setBalloons] = useState(Array(12).fill(true));
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState(Array(3).fill(null));

  const { selectedCard = {}, amount = 0, recipient = {}, personalization = {}, wrapping = {} } = giftCardData || {};

  useEffect(() => {
    // Reset state when gift card data changes
    setIsUnwrapped(false);
    setIsUnwrapping(false);
    setInteractionProgress(0);
    setScratchedCells(Array(25).fill(false));
    setPuzzlePieces(Array(9).fill(false));
    setSpinRotation(0);
    setIsSpinning(false);
    setSpinCount(0);
    setBalloons(Array(12).fill(true));
    setShowConfetti(false);
    setConfettiPieces([]);
    setFlippedCards([]);
    setMatchedPairs([]);
    setQuizAnswers(Array(3).fill(null));
  }, [giftCardData]);

  useEffect(() => {
    // Generate confetti pieces when showing confetti
    if (showConfetti) {
      const pieces = [];
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 10 + 5,
          color: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'][Math.floor(Math.random() * 5)],
          rotation: Math.random() * 360,
          delay: Math.random() * 2
        });
      }
      setConfettiPieces(pieces);
    }
  }, [showConfetti]);

  const handleUnwrap = () => {
    if (wrapping?.interactive) {
      setIsInteracting(true);
    } else {
      setIsUnwrapping(true);
      setShowConfetti(true);
      
      setTimeout(() => {
        setIsUnwrapped(true);
        setIsUnwrapping(false);
      }, 1500);
    }
  };

  const handleInteractionProgress = (increment) => {
    setInteractionProgress(prev => {
      const newProgress = Math.min(100, prev + increment);
      if (newProgress >= 100) {
        setTimeout(() => {
          setIsInteracting(false);
          setIsUnwrapping(true);
          setShowConfetti(true);
          setTimeout(() => {
            setIsUnwrapped(true);
            setIsUnwrapping(false);
          }, 1500);
        }, 500);
      }
      return newProgress;
    });
  };

  const getTemplateColor = () => {
    switch (personalization?.template) {
      case 'birthday':
        return 'bg-blue-600';
      case 'congratulations':
        return 'bg-green-500';
      case 'thankyou':
        return 'bg-blue-800';
      case 'holiday':
        return 'bg-red-500';
      case 'wedding':
        return 'bg-blue-500';
      case 'graduation':
        return 'bg-yellow-500';
      case 'celebration':
        return 'bg-blue-700';
      case 'love':
        return 'bg-blue-800';
      default:
        return 'bg-blue-600';
    }
  };

  const getTemplateEmoji = () => {
    switch (personalization?.template) {
      case 'birthday':
        return '🎂';
      case 'congratulations':
        return '🎉';
      case 'thankyou':
        return '💖';
      case 'holiday':
        return '🎄';
      case 'wedding':
        return '💍';
      case 'graduation':
        return '🎓';
      case 'celebration':
        return '🥂';
      case 'love':
        return '❤️';
      default:
        return '🎂';
    }
  };

  const getTemplateName = () => {
    switch (personalization?.template) {
      case 'birthday':
        return 'عيد ميلاد';
      case 'congratulations':
        return 'تهنئة';
      case 'thankyou':
        return 'شكراً';
      case 'holiday':
        return 'عطلة';
      case 'wedding':
        return 'زفاف';
      case 'graduation':
        return 'تخرج';
      case 'celebration':
        return 'احتفال';
      case 'love':
        return 'حب';
      default:
        return 'عيد ميلاد';
    }
  };

  const getWrappingIcon = () => {
    switch (wrapping?.style) {
      case 'standard':
        return <Gift size={24} className="text-blue-600" />;
      case 'interactive':
        return <Gamepad2 size={24} className="text-blue-600" />;
      default:
        return <Gift size={24} className="text-blue-600" />;
    }
  };

  const getAnimationIcon = () => {
    switch (wrapping?.animation) {
      case 'envelope':
        return <Mail size={24} className="text-blue-600" />;
      case 'confetti':
        return <PartyPopper size={24} className="text-pink-600" />;
      case 'unwrap':
        return <Package size={24} className="text-purple-600" />;
      default:
        return <Gift size={24} className="text-gray-600" />;
    }
  };

  const getAnimationClass = () => {
    switch (wrapping?.animation) {
      case 'envelope':
        return 'animate-envelope-open';
      case 'confetti':
        return 'animate-confetti-explosion';
      case 'unwrap':
        return 'animate-unwrap-gift';
      default:
        return '';
    }
  };

  const getInteractiveType = () => {
    if (!wrapping?.interactive) return null;
    
    switch (wrapping.interactive) {
      case 'friendship_quiz':
        return {
          name: 'اختبار الصداقة',
          action: 'أجب على الأسئلة لكشف هديتك!',
          component: <FriendshipQuiz onProgress={handleInteractionProgress} quizAnswers={quizAnswers} setQuizAnswers={setQuizAnswers} />
        };
      case 'flappy_bird':
        return {
          name: 'لعبة الهدايا الطائرة',
          action: 'تحكم بالهدية الطائرة لكشف هديتك!',
          component: <FlappyBirdMini onProgress={handleInteractionProgress} />
        };
      case 'maze':
        return {
          name: 'متاهة الهدايا',
          action: 'تنقل في المتاهة للوصول إلى الهدية!',
          component: <MazeMini onProgress={handleInteractionProgress} />
        };
      case 'card_matching':
        return {
          name: 'لعبة مطابقة البطاقات',
          action: 'اعثر على الأزواج المتطابقة لكشف هديتك!',
          component: <MemoryGame 
            onProgress={handleInteractionProgress} 
            flippedCards={flippedCards} 
            setFlippedCards={setFlippedCards} 
            matchedPairs={matchedPairs} 
            setMatchedPairs={setMatchedPairs} 
          />
        };
      case 'scratch':
        return {
          name: 'بطاقة الخدش التفاعلية',
          action: 'اخدش البطاقة لكشف هديتك!',
          component: <ScratchCard onProgress={handleInteractionProgress} scratchedCells={scratchedCells} setScratchedCells={setScratchedCells} />
        };
      case 'treasure_hunt':
        return {
          name: 'لعبة البحث عن الكنز',
          action: 'اتبع الدلائل للعثور على هديتك!',
          component: <TreasureHuntMini onProgress={handleInteractionProgress} />
        };
      case 'word_scramble':
        return {
          name: 'لعبة ترتيب الكلمات',
          action: 'رتب الحروف لتكوين الكلمة الصحيحة!',
          component: <WordScrambleMini onProgress={handleInteractionProgress} />
        };
      case 'puzzle':
        return {
          name: 'لعبة تركيب الصور',
          action: 'رتب القطع لتكوين الصورة الكاملة!',
          component: <PuzzleGame onProgress={handleInteractionProgress} puzzlePieces={puzzlePieces} setPuzzlePieces={setPuzzlePieces} />
        };
      case 'balloon':
        return {
          name: 'تحدي فرقعات البالونات',
          action: 'افرقع البالونات لكشف هديتك!',
          component: <BalloonPopper onProgress={handleInteractionProgress} balloons={balloons} setBalloons={setBalloons} />
        };
      case 'reaction':
        return {
          name: 'تحدي سرعة التفاعل',
          action: 'اختبر سرعة تفاعلك لكشف هديتك!',
          component: <ReactionTimeMini onProgress={handleInteractionProgress} />
        };
      default:
        return null;
    }
  };

  const renderDeviceFrame = () => {
    const deviceClass = activeDevice === 'mobile' 
      ? 'w-[320px] h-[640px] rounded-[36px] border-[12px]' 
      : 'w-[768px] h-[512px] rounded-[12px] border-[12px]';
    
    return (
      <div className={`${deviceClass} border-gray-800 bg-white overflow-hidden mx-auto relative`}>
        {activeDevice === 'mobile' && (
          <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex justify-center items-center">
            <div className="w-20 h-4 bg-black rounded-b-xl"></div>
          </div>
        )}
        <div className="w-full h-full overflow-y-auto">
          {renderGiftCardPreview()}
        </div>
      </div>
    );
  };

  const renderGiftCardPreview = () => {
    if (isInteracting) {
      const interactiveType = getInteractiveType();
      return (
        <div className="h-full flex flex-col">
          <div className="bg-blue-50 p-4 text-center">
            <h3 className="text-lg font-bold text-blue-800">{interactiveType?.name || 'لعبة تفاعلية'}</h3>
            <p className="text-sm text-blue-700">{interactiveType?.action || 'العب للكشف عن هديتك!'}</p>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 relative">
            {interactiveType?.component}
          </div>
          <div className="p-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${interactionProgress}%` }}></div>
            </div>
          </div>
        </div>
      );
    }

    if (!isUnwrapped) {
      return (
        <div className="h-full flex flex-col">
          <div className={`${getTemplateColor()} text-white p-4 text-center`}>
            <h3 className="text-lg font-bold">لقد تلقيت هدية!</h3>
            <p className="text-sm">من: {viewMode === 'recipient' ? 'صديقك' : 'أنت'}</p>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
            {showConfetti && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {confettiPieces.map(piece => (
                  <div 
                    key={piece.id}
                    className="absolute animate-float-1"
                    style={{
                      left: `${piece.x}%`,
                      top: `${piece.y}%`,
                      width: `${piece.size}px`,
                      height: `${piece.size}px`,
                      backgroundColor: piece.color,
                      transform: `rotate(${piece.rotation}deg)`,
                      animationDelay: `${piece.delay}s`
                    }}
                  ></div>
                ))}
              </div>
            )}
            
            {isUnwrapping ? (
              <div className="animate-spin mb-4">
                <RefreshCw size={48} className="text-blue-600" />
              </div>
            ) : (
              <>
                <div className={`w-48 h-48 relative mb-6 ${getAnimationClass()}`}>
                  <div className={`absolute inset-0 rounded-lg shadow-lg overflow-hidden ${personalization?.displayStyle === 'animated' ? 'animate-pulse' : ''}`}>
                    <img 
                      src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                      alt="Gift Wrapping" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                    {getWrappingIcon()}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-sm">
                    {getAnimationIcon()}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {recipient?.name ? `إلى ${recipient.name}` : 'إليك'}
                </h4>
                
                <p className="text-gray-600 text-center mb-6">
                  {wrapping?.interactive 
                    ? 'انقر للعب وكشف هديتك!' 
                    : 'انقر لفتح هديتك!'}
                </p>
                
                <button
                  onClick={handleUnwrap}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition transform hover:scale-105"
                >
                  {wrapping?.interactive ? 'العب الآن' : 'افتح الهدية'}
                </button>
              </>
            )}
          </div>
        </div>
      );
    }

    // Unwrapped gift card
    return (
      <div className="h-full flex flex-col">
        <div className={`${getTemplateColor()} text-white p-4`}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold flex items-center">
              <span className="ml-2">{getTemplateEmoji()}</span>
              {getTemplateName()}
            </h3>
            <div className="flex items-center space-x-1">
              <Gift size={16} />
              <span className="text-sm font-medium">بطاقة هدية</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {confettiPieces.map(piece => (
                <div 
                  key={piece.id}
                  className="absolute animate-float-1"
                  style={{
                    left: `${piece.x}%`,
                    top: `${piece.y}%`,
                    width: `${piece.size}px`,
                    height: `${piece.size}px`,
                    backgroundColor: piece.color,
                    transform: `rotate(${piece.rotation}deg)`,
                    animationDelay: `${piece.delay}s`
                  }}
                ></div>
              ))}
            </div>
          )}
          
          <div className={`bg-white rounded-lg shadow-md overflow-hidden mb-4 ${
            personalization?.displayStyle === 'animated' ? 'animate-fadeIn' : 
            personalization?.displayStyle === '3d' ? 'transform-preserve-3d perspective-1000 hover:rotate-y-12 hover:shadow-xl transition-all duration-500' : ''
          }`}>
            <div className="p-4 flex items-center space-x-3 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center">
                {selectedCard?.emoji ? (
                  <span className="text-3xl">{selectedCard.emoji}</span>
                ) : (
                  <Gift size={24} className="text-blue-600" />
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{selectedCard?.name || 'بطاقة هدية'}</h4>
                <p className="text-sm text-gray-600">القيمة: ${amount}</p>
              </div>
            </div>
            
            {personalization?.message && (
              <div className="p-4 border-b border-gray-100">
                <p className="text-gray-700 italic">{personalization.message}</p>
              </div>
            )}
            
            {personalization?.media && (
              <div className="p-4">
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={personalization.media.preview} 
                    alt="Media" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-2 bg-gray-50 border-t border-gray-200 flex items-center">
                    {personalization.media.type === 'image' ? (
                      <ImageIcon size={16} className="text-gray-500 ml-2" />
                    ) : (
                      <VideoIcon size={16} className="text-gray-500 ml-2" />
                    )}
                    <span className="text-xs text-gray-500">
                      {personalization.media.type === 'image' ? 'صورة' : 'فيديو'} مرفق
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-4">
            <h4 className="font-medium text-blue-800 mb-2">تعليمات الاسترداد</h4>
            <ol className="text-sm text-blue-700 space-y-2 pr-4 text-right">
              <li>انقر على زر "استرداد الآن" أدناه</li>
              <li>أدخل الرمز عند الدفع على موقع {selectedCard?.name || 'المتجر'}</li>
              <li>استمتع بهديتك!</li>
            </ol>
          </div>
          
          <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition mb-4 transform hover:scale-105">
            استرداد الآن
          </button>
          
          <div className="flex justify-center">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm">
              <MessageCircle size={16} />
              <span>قل شكراً</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">معاينة الهدية</h3>
        <button 
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="flex justify-center space-x-4 mb-4">
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium ${viewMode === 'recipient' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setViewMode('recipient')}
        >
          عرض المستلم
        </button>
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium ${viewMode === 'sender' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setViewMode('sender')}
        >
          عرض المرسل
        </button>
      </div>
      
      <div className="flex justify-center space-x-4 mb-4">
        <button 
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm ${activeDevice === 'mobile' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setActiveDevice('mobile')}
        >
          <span>جوال</span>
        </button>
        <button 
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm ${activeDevice === 'tablet' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setActiveDevice('tablet')}
        >
          <span>تابلت</span>
        </button>
      </div>
      
      <div className="bg-gray-900 p-6 rounded-xl">
        {renderDeviceFrame()}
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Sparkles size={20} className="text-blue-600" />
          </div>
          <div className="mr-3 text-right">
            <h4 className="text-sm font-medium text-blue-800">معلومات المعاينة</h4>
            <p className="mt-1 text-sm text-blue-600">
              هذا هو كيف ستظهر هديتك {viewMode === 'recipient' ? 'للمستلم' : 'لك'}. يمكنك التفاعل مع المعاينة لتجربة رحلة بطاقة الهدية الكاملة.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {selectedCard?.name || 'بطاقة هدية'} - ${amount}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                قالب {getTemplateName()}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                تغليف {wrapping?.style === 'standard' ? 'عادي' : 'تفاعلي'}
              </span>
              {wrapping?.interactive && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  لعبة {getInteractiveType()?.name || 'تفاعلية'}
                </span>
              )}
              {wrapping?.animation !== 'none' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  حركة {animationOptions.find(a => a.id === wrapping.animation)?.name || 'فتح'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={onClose}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100"
        >
          <ChevronLeft size={18} />
          <span>العودة للتحرير</span>
        </button>
        <button
          onClick={() => {
            setIsUnwrapped(false);
            setIsUnwrapping(false);
            setInteractionProgress(0);
            setScratchedCells(Array(25).fill(false));
            setPuzzlePieces(Array(9).fill(false));
            setSpinRotation(0);
            setIsSpinning(false);
            setSpinCount(0);
            setBalloons(Array(12).fill(true));
            setShowConfetti(false);
            setFlippedCards([]);
            setMatchedPairs([]);
            setQuizAnswers(Array(3).fill(null));
          }}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-blue-600 hover:bg-blue-50"
        >
          <RefreshCw size={18} />
          <span>إعادة ضبط المعاينة</span>
        </button>
      </div>
    </div>
  );
};

// Interactive game components for preview
const ScratchCard = ({ onProgress, scratchedCells, setScratchedCells }) => {
  const handleScratch = (index) => {
    if (scratchedCells[index]) return;
    
    const newScratched = [...scratchedCells];
    newScratched[index] = true;
    setScratchedCells(newScratched);
    
    const scratchedCount = newScratched.filter(Boolean).length;
    const progressIncrement = 100 / 15; // Need to scratch 15 cells to complete
    
    if (scratchedCount <= 15) {
      onProgress(progressIncrement);
    }
  };
  
  return (
    <div className="w-full max-w-xs">
      <div className="grid grid-cols-5 gap-1">
        {scratchedCells.map((isScratched, index) => (
          <div 
            key={index}
            className={`aspect-square rounded-md cursor-pointer flex items-center justify-center text-lg font-bold transition-all duration-300 ${
              isScratched 
                ? 'bg-white border border-gray-200 transform scale-95' 
                : 'bg-gray-300 hover:bg-gray-400 hover:shadow-md'
            }`}
            onClick={() => handleScratch(index)}
          >
            {isScratched && (
              <span className="animate-bounce">
                {['🎁', '🎉', '🎊', '✨', '💝', '🎈'][index % 6]}
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="text-center mt-4 text-sm text-gray-600">اخدش المناطق الرمادية لكشف هديتك!</p>
    </div>
  );
};

const PuzzleGame = ({ onProgress, puzzlePieces, setPuzzlePieces }) => {
  const handlePuzzlePiece = (index) => {
    if (puzzlePieces[index]) return;
    
    const newPieces = [...puzzlePieces];
    newPieces[index] = true;
    setPuzzlePieces(newPieces);
    
    const solvedCount = newPieces.filter(Boolean).length;
    const progressIncrement = 100 / 9; // Need to solve all 9 pieces
    
    onProgress(progressIncrement);
  };
  
  return (
    <div className="w-full max-w-xs">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-blue-300 mb-4">
        <img 
          src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
          alt="Complete Puzzle" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1">
          {puzzlePieces.map((isSolved, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            
            return (
              <div 
                key={index}
                className={`relative cursor-pointer transition-all duration-500 ${
                  isSolved ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-90'
                }`}
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80)`,
                  backgroundSize: '300% 300%',
                  backgroundPosition: `${col * 50}% ${row * 50}%`
                }}
              >
                {!isSolved && (
                  <div 
                    className="absolute inset-0 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-bold text-xl transition-all duration-300 hover:scale-105"
                    onClick={() => handlePuzzlePiece(index)}
                  >
                    {index + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-center text-sm text-gray-600">انقر على قطع اللغز بالترتيب الرقمي!</p>
    </div>
  );
};

const SpinnerWheel = ({ onProgress, rotation, setRotation, isSpinning, setIsSpinning, spinCount, setSpinCount }) => {
  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const newRotation = rotation + 1080 + Math.random() * 360;
    setRotation(newRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setSpinCount(prev => prev + 1);
      
      // Need 3 spins to complete
      if (spinCount < 3) {
        onProgress(33.33);
      }
    }, 3000);
  };
  
  return (
    <div className="w-full max-w-xs flex flex-col items-center">
      <div className="relative">
        <div 
          className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 relative cursor-pointer shadow-lg"
          style={{ 
            transform: `rotate(${rotation}deg)`, 
            transition: isSpinning ? 'transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none' 
          }}
        >
          {['بطاقة هدية', 'مكافأة $5', 'رسالة خاصة', 'كود خصم', 'شحن مجاني', 'نقاط إضافية', 'هدية غامضة', 'حالة VIP'].map((prize, index) => (
            <React.Fragment key={index}>
              <div 
                className="absolute w-1 h-24 bg-white"
                style={{ 
                  left: 'calc(50% - 0.5px)', 
                  top: '0', 
                  transformOrigin: 'bottom center',
                  transform: `rotate(${index * 45}deg)`
                }}
              />
              <div
                className="absolute text-white text-xs font-bold"
                style={{
                  left: '50%',
                  top: '25%',
                  transform: `rotate(${index * 45 + 22.5}deg) translateY(-20px) translateX(-50%) rotate(-${rotation}deg)`,
                  width: '60px',
                  textAlign: 'center'
                }}
              >
                {prize}
              </div>
            </React.Fragment>
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center transform hover:scale-105 transition-transform">
              <Gift size={28} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-2">
          <div className="w-4 h-4 bg-yellow-500 transform rotate-45"></div>
        </div>
      </div>
      
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className={`mt-6 px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
          isSpinning 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isSpinning ? 'جاري الدوران...' : 'أدر العجلة!'}
      </button>
      
      <p className="text-center mt-2 text-sm text-gray-600">
        {spinCount < 3 ? `أدر ${3 - spinCount} مرات أخرى لكشف هديتك!` : 'استمر في الدوران للمتعة!'}
      </p>
    </div>
  );
};

const BalloonPopper = ({ onProgress, balloons, setBalloons }) => {
  const handleBalloonPop = (index) => {
    if (!balloons[index]) return;
    
    const newBalloons = [...balloons];
    newBalloons[index] = false;
    setBalloons(newBalloons);
    
    const poppedCount = newBalloons.filter(balloon => !balloon).length;
    const progressIncrement = 100 / 8; // Need to pop 8 balloons to complete
    
    if (poppedCount <= 8) {
      onProgress(progressIncrement);
    }
  };
  
  return (
    <div className="w-full max-w-xs">
      <div className="grid grid-cols-4 grid-rows-3 gap-3">
        {balloons.map((isActive, index) => (
          <div 
            key={index}
            className="relative"
          >
            {isActive ? (
              <div
                className={`w-16 h-20 bg-blue-${(index % 5) * 100 + 400} rounded-full relative cursor-pointer transform hover:scale-105 transition-transform animate-float-${index % 5 + 1}`}
                onClick={() => handleBalloonPop(index)}
              >
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-gray-400"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl">
                  🎈
                </div>
              </div>
            ) : (
              <div className="w-16 h-20 flex items-center justify-center">
                <span className="text-2xl animate-pop-in">✨</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-center mt-4 text-sm text-gray-600">افرقع البالونات لكشف هديتك!</p>
    </div>
  );
};

const MemoryGame = ({ onProgress, flippedCards, setFlippedCards, matchedPairs, setMatchedPairs }) => {
  const handleCardFlip = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedPairs.includes(index)) return;
    
    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);
    
    if (newFlippedCards.length === 2) {
      // Check if it's a match (in this demo, adjacent pairs are matches)
      const isMatch = Math.floor(newFlippedCards[0] / 2) === Math.floor(newFlippedCards[1] / 2);
      
      if (isMatch) {
        setMatchedPairs(prev => [...prev, ...newFlippedCards]);
        setFlippedCards([]);
        onProgress(25); // 4 pairs to match
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };
  
  return (
    <div className="w-full max-w-xs">
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, index) => {
          const pairIndex = Math.floor(index / 2);
          const isFlipped = flippedCards.includes(index) || matchedPairs.includes(index);
          const emojis = ['🎁', '🎉', '🎊', '🎈'];
          
          return (
            <div 
              key={index}
              className={`aspect-square rounded-md cursor-pointer transition-all duration-300 ${
                isFlipped 
                  ? 'bg-white border-2 border-blue-400' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={() => handleCardFlip(index)}
            >
              <div className="w-full h-full flex items-center justify-center">
                {isFlipped ? (
                  <span className="text-2xl">{emojis[pairIndex]}</span>
                ) : (
                  <span className="text-white text-2xl">؟</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-center mt-4 text-sm text-gray-600">ابحث عن الأزواج المتطابقة لكشف هديتك!</p>
    </div>
  );
};

const FriendshipQuiz = ({ onProgress, quizAnswers, setQuizAnswers }) => {
  const questions = [
    {
      question: "ما هو اللون المفضل لصديقك؟",
      options: ["أزرق", "أحمر", "أخضر", "أصفر"]
    },
    {
      question: "ما هو الطعام المفضل لصديقك؟",
      options: ["بيتزا", "برغر", "سلطة", "معكرونة"]
    },
    {
      question: "ما هو النشاط المفضل لصديقك في وقت الفراغ؟",
      options: ["قراءة", "مشاهدة الأفلام", "ممارسة الرياضة", "السفر"]
    }
  ];
  
  const handleQuizAnswer = (questionIndex, answerIndex) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
    
    // In this demo, any answer is considered correct
    onProgress(33.33); // 3 questions
  };
  
  return (
    <div className="w-full max-w-xs">
      <div className="space-y-4">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-white rounded-lg p-3 shadow-sm">
            <p className="font-medium text-gray-800 mb-2 text-right">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((option, oIndex) => (
                <div 
                  key={oIndex}
                  className={`p-2 rounded-md cursor-pointer transition-all text-right ${
                    quizAnswers[qIndex] === oIndex
                      ? 'bg-blue-100 border border-blue-400'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => handleQuizAnswer(qIndex, oIndex)}
                >
                  <span className="text-sm">{option}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-center mt-4 text-sm text-gray-600">أجب على الأسئلة لكشف هديتك!</p>
    </div>
  );
};

// Simplified mini-games for preview
const FlappyBirdMini = ({ onProgress }) => {
  const [score, setScore] = useState(0);
  
  const handleJump = () => {
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore <= 5) {
        onProgress(20); // 5 points to win
      }
      return newScore;
    });
  };
  
  return (
    <div className="w-full max-w-xs text-center">
      <div className="bg-blue-100 h-40 rounded-lg relative overflow-hidden mb-4">
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <Gift size={20} className="text-white" />
        </div>
        <div className="absolute right-0 inset-y-0 flex flex-col justify-between py-4">
          <div className="w-8 h-20 bg-green-500"></div>
          <div className="w-8 h-20 bg-green-500"></div>
        </div>
      </div>
      <p className="text-lg font-bold mb-2">النقاط: {score}/5</p>
      <button 
        onClick={handleJump}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        اضغط للقفز
      </button>
      <p className="text-sm text-gray-600 mt-2">اجمع 5 نقاط لكشف هديتك!</p>
     </div>
  );
};

const MazeMini = ({ onProgress }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const mazeSize = 3;
  
  const handleMove = (dx, dy) => {
    setPosition(prev => {
      const newX = Math.min(mazeSize - 1, Math.max(0, prev.x + dx));
      const newY = Math.min(mazeSize - 1, Math.max(0, prev.y + dy));
      
      // If moved to a new position
      if (newX !== prev.x || newY !== prev.y) {
        onProgress(33.33); // 3 moves to complete
      }
      
      return { x: newX, y: newY };
    });
  };
  
  return (
    <div className="w-full max-w-xs text-center">
      <div className="grid grid-cols-3 gap-1 mb-4">
        {Array.from({ length: 9 }).map((_, index) => {
          const x = index % 3;
          const y = Math.floor(index / 3);
          const isPlayer = x === position.x && y === position.y;
          const isGoal = x === 2 && y === 2;
          
          return (
            <div 
              key={index}
              className={`w-12 h-12 flex items-center justify-center ${
                isPlayer ? 'bg-blue-500' : 
                isGoal ? 'bg-green-100 border border-green-500' : 
                'bg-gray-100 border border-gray-200'
              }`}
            >
              {isPlayer && <div className="w-6 h-6 rounded-full bg-white"></div>}
              {isGoal && <Gift size={20} className="text-green-600" />}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div></div>
        <button 
          onClick={() => handleMove(0, -1)}
          className="p-2 bg-blue-100 text-blue-700 rounded-lg"
        >
          ↑
        </button>
        <div></div>
        <button 
          onClick={() => handleMove(-1, 0)}
          className="p-2 bg-blue-100 text-blue-700 rounded-lg"
        >
          ←
        </button>
        <div></div>
        <button 
          onClick={() => handleMove(1, 0)}
          className="p-2 bg-blue-100 text-blue-700 rounded-lg"
        >
          →
        </button>
        <div></div>
        <button 
          onClick={() => handleMove(0, 1)}
          className="p-2 bg-blue-100 text-blue-700 rounded-lg"
        >
          ↓
        </button>
        <div></div>
      </div>
      <p className="text-sm text-gray-600 mt-2">صل إلى الهدية لكشف هديتك!</p>
    </div>
  );
};

const WordScrambleMini = ({ onProgress }) => {
  const [solved, setSolved] = useState(false);
  
  const handleSolve = () => {
    setSolved(true);
    onProgress(100);
  };
  
  return (
    <div className="w-full max-w-xs text-center">
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h3 className="text-xl font-bold mb-2 tracking-widest">ة ي د ه</h3>
        <input 
          type="text" 
          placeholder="اكتب الكلمة هنا..." 
          className="w-full p-2 border border-gray-300 rounded-lg text-center mb-2"
        />
        <button 
          onClick={handleSolve}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          تحقق
        </button>
      </div>
      {solved && (
        <div className="bg-green-100 p-2 rounded-lg text-green-700 font-medium">
          أحسنت! الإجابة الصحيحة هي "هدية"
        </div>
      )}
      <p className="text-sm text-gray-600 mt-2">رتب الحروف لتكوين الكلمة الصحيحة!</p>
    </div>
  );
};

const TreasureHuntMini = ({ onProgress }) => {
  const [step, setStep] = useState(0);
  
  const handleNextClue = () => {
    setStep(prev => {
      const newStep = prev + 1;
      onProgress(33.33); // 3 steps to complete
      return newStep;
    });
  };
  
  return (
    <div className="w-full max-w-xs text-center">
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-bold mb-2">البحث عن الكنز</h3>
        {step === 0 && (
          <p className="text-blue-700 mb-2">الدليل #1: ابحث في المكان الذي تجد فيه الكتب</p>
        )}
        {step === 1 && (
          <p className="text-blue-700 mb-2">الدليل #2: الآن توجه إلى المكان الذي يمكنك فيه شراء الطعام</p>
        )}
        {step === 2 && (
          <p className="text-blue-700 mb-2">الدليل #3: اذهب إلى المكان الذي يمكنك فيه رؤية النجوم</p>
        )}
        {step === 3 && (
          <div className="bg-green-100 p-2 rounded-lg text-green-700 font-medium">
            مبروك! لقد وجدت الهدية!
          </div>
        )}
        {step < 3 && (
          <button 
            onClick={handleNextClue}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-2"
          >
            الدليل التالي
          </button>
        )}
      </div>
      <p className="text-sm text-gray-600">اتبع الدلائل للعثور على هديتك!</p>
    </div>
  );
};

const ReactionTimeMini = ({ onProgress }) => {
  const [status, setStatus] = useState('waiting');
  const [attempts, setAttempts] = useState(0);
  
  const handleClick = () => {
    if (status === 'waiting') {
      setStatus('ready');
      setTimeout(() => {
        setStatus('click');
      }, 1000 + Math.random() * 2000);
    } else if (status === 'click') {
      setStatus('success');
      setAttempts(prev => prev + 1);
      onProgress(33.33); // 3 successful clicks to complete
      
      setTimeout(() => {
        if (attempts < 2) {
          setStatus('waiting');
        }
      }, 1500);
    }
  };
  
  return (
    <div className="w-full max-w-xs text-center">
      <div 
        className={`w-full h-40 rounded-lg flex items-center justify-center cursor-pointer ${
          status === 'waiting' ? 'bg-yellow-100' :
          status === 'ready' ? 'bg-red-100' :
          status === 'click' ? 'bg-green-100' :
          'bg-blue-100'
        }`}
        onClick={handleClick}
      >
        {status === 'waiting' && <p className="text-yellow-700 font-bold">انتظر...</p>}
        {status === 'ready' && <p className="text-red-700 font-bold">استعد!</p>}
        {status === 'click' && <p className="text-green-700 font-bold">انقر الآن!</p>}
        {status === 'success' && <p className="text-blue-700 font-bold">أحسنت!</p>}
      </div>
      <p className="text-sm text-gray-600 mt-2">انقر بأسرع ما يمكن عندما ترى اللون الأخضر!</p>
      <p className="text-sm font-medium mt-1">المحاولات: {attempts}/3</p>
    </div>
  );
};

// Animation options for reference
const animationOptions = [
  {
    id: 'none',
    name: 'بدون حركة',
    description: 'فتح عادي بدون تأثيرات'
  },
  {
    id: 'envelope',
    name: 'مظروف',
    description: 'تأثير فتح المظروف'
  },
  {
    id: 'confetti',
    name: 'كونفيتي',
    description: 'انفجار من الكونفيتي'
  },
  {
    id: 'unwrap',
    name: 'فتح الهدية',
    description: 'تأثير فتح صندوق الهدية'
  }
];

export default GiftPreview;