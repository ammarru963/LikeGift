import React, { useState, useEffect } from 'react';
import { Map, Search, Gift, Award, Compass, CheckCircle } from 'lucide-react';

const clues = [
  {
    id: 1,
    text: "ابحث في المكان الذي تجد فيه الكتب",
    hint: "إنها مكتبة!",
    location: "library",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    text: "الآن توجه إلى المكان الذي يمكنك فيه شراء الطعام",
    hint: "فكر في مكان مليء بالفواكه والخضروات",
    location: "market",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    text: "اذهب إلى المكان الذي يمكنك فيه رؤية النجوم",
    hint: "إنه مرصد!",
    location: "observatory",
    image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 4,
    text: "أخيرًا، ابحث في المكان الذي تجد فيه الهدايا",
    hint: "فكر في مكان احتفالي",
    location: "gift_shop",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  }
];

const locations = [
  { id: "library", name: "المكتبة" },
  { id: "market", name: "السوق" },
  { id: "observatory", name: "المرصد" },
  { id: "gift_shop", name: "متجر الهدايا" },
  { id: "park", name: "الحديقة" },
  { id: "museum", name: "المتحف" }
];

const TreasureHunt = ({ onComplete, onProgress }) => {
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [foundClues, setFoundClues] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  
  useEffect(() => {
    if (gameCompleted) {
      setShowConfetti(true);
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
      
      // Complete the game after showing results
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 3000);
    }
  }, [gameCompleted, onComplete]);
  
  const handleLocationSelect = (locationId) => {
    setSelectedLocation(locationId);
    
    const currentClue = clues[currentClueIndex];
    
    if (locationId === currentClue.location) {
      // Correct location
      const newFoundClues = [...foundClues, currentClue.id];
      setFoundClues(newFoundClues);
      
      // Update progress
      if (onProgress) {
        const progressIncrement = 100 / clues.length;
        onProgress(progressIncrement);
      }
      
      // Move to next clue or complete game
      if (currentClueIndex < clues.length - 1) {
        setCurrentClueIndex(currentClueIndex + 1);
        setShowHint(false);
      } else {
        setGameCompleted(true);
        if (onProgress) onProgress(100);
      }
    }
    
    // Reset selection after a delay
    setTimeout(() => {
      setSelectedLocation(null);
    }, 1000);
  };
  
  const toggleHint = () => {
    setShowHint(!showHint);
  };
  
  const currentClue = clues[currentClueIndex];
  
  return (
    <div className="w-full max-w-md mx-auto">
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
      
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">لعبة البحث عن الكنز</h2>
        <p className="text-gray-600">اتبع الدلائل للعثور على الهدية!</p>
      </div>
      
      {!gameCompleted ? (
        <>
          <div className="bg-blue-50 p-4 rounded-lg mb-4 text-right">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={toggleHint}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 flex items-center"
              >
                <Search size={16} className="mr-1" />
                <span>{showHint ? 'إخفاء التلميح' : 'إظهار التلميح'}</span>
              </button>
              <div className="flex items-center">
                <Compass size={20} className="text-blue-600 ml-2" />
                <span className="font-medium text-blue-800">الدليل {currentClueIndex + 1} من {clues.length}</span>
              </div>
            </div>
            <p className="text-lg font-medium text-blue-800 mb-2">{currentClue.text}</p>
            {showHint && (
              <p className="text-sm text-blue-600 italic">{currentClue.hint}</p>
            )}
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2 text-right">اختر الموقع:</h3>
            <div className="grid grid-cols-2 gap-2">
              {locations.map(location => (
                <button
                  key={location.id}
                  className={`p-3 rounded-lg text-right transition-all ${
                    selectedLocation === location.id
                      ? selectedLocation === currentClue.location
                        ? 'bg-green-100 border border-green-500'
                        : 'bg-red-100 border border-red-500'
                      : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                  }`}
                  onClick={() => handleLocationSelect(location.id)}
                >
                  <span>{location.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2 text-right">الدلائل المكتشفة:</h3>
            <div className="space-y-2">
              {clues.map((clue, index) => (
                <div 
                  key={clue.id}
                  className={`flex items-center p-2 rounded-lg ${
                    foundClues.includes(clue.id)
                      ? 'bg-green-50 border border-green-200'
                      : index === currentClueIndex
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-gray-100 opacity-50'
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden mr-3">
                    {foundClues.includes(clue.id) ? (
                      <img src={clue.image} alt={clue.location} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <Map size={16} className="text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-right">
                    <p className={`text-sm ${foundClues.includes(clue.id) ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
                      {foundClues.includes(clue.id) ? `تم العثور على الدليل ${index + 1}` : `الدليل ${index + 1}`}
                    </p>
                  </div>
                  {foundClues.includes(clue.id) && (
                    <CheckCircle size={16} className="text-green-500 ml-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <Award size={48} className="text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">مبروك!</h3>
          <p className="text-green-700 mb-4">
            لقد أكملت البحث عن الكنز ووجدت الهدية!
          </p>
          <div className="w-48 h-48 mx-auto rounded-lg overflow-hidden mb-4">
            <img 
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Gift" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-green-700">
            ستظهر بطاقة الهدية الخاصة بك الآن!
          </p>
        </div>
      )}
    </div>
  );
};

export default TreasureHunt;