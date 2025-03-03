import React, { useState, useEffect, useRef } from 'react';
import { Gift, Award } from 'lucide-react';

const DigitalScratchoff = ({ onComplete, onProgress }) => {
  const [scratched, setScratched] = useState(Array(100).fill(false));
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    context.lineWidth = 30;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = '#ffffff';
    context.globalCompositeOperation = 'destination-out';
    contextRef.current = context;
    
    // Draw scratch layer
    const scratchLayer = new Image();
    scratchLayer.onload = () => {
      context.drawImage(scratchLayer, 0, 0, canvas.width, canvas.height);
    };
    scratchLayer.src = 'https://images.unsplash.com/photo-1607344645866-009c320c5ab0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80';
  }, []);
  
  useEffect(() => {
    // Check if enough is scratched
    if (scratchPercentage >= 70 && !gameCompleted) {
      setGameCompleted(true);
      setShowConfetti(true);
      
      // Generate confetti
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
  }, [scratchPercentage, gameCompleted, onComplete]);
  
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    
    // Mark this cell as scratched
    updateScratchedCells(offsetX, offsetY);
  };
  
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    
    // Mark this cell as scratched
    updateScratchedCells(offsetX, offsetY);
  };
  
  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };
  
  const updateScratchedCells = (x, y) => {
    const canvas = canvasRef.current;
    const cellWidth = canvas.width / 10;
    const cellHeight = canvas.height / 10;
    
    const col = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);
    const index = row * 10 + col;
    
    if (index >= 0 && index < 100 && !scratched[index]) {
      const newScratched = [...scratched];
      newScratched[index] = true;
      setScratchedCells(newScratched);
    }
  };
  
  const setScratchedCells = (newScratched) => {
    setScratched(newScratched);
    
    // Calculate percentage scratched
    const scratchedCount = newScratched.filter(Boolean).length;
    const percentage = (scratchedCount / 100) * 100;
    setScratchPercentage(percentage);
    
    // Update progress
    if (onProgress) {
      onProgress(Math.min(percentage, 100));
    }
  };
  
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    
    updateScratchedCells(offsetX, offsetY);
  };
  
  const handleTouchMove = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    
    updateScratchedCells(offsetX, offsetY);
  };
  
  const handleTouchEnd = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };
  
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
        <h2 className="text-xl font-bold text-gray-800">بطاقة الخدش التفاعلية</h2>
        <p className="text-gray-600">اخدش البطاقة لكشف الهدية!</p>
      </div>
      
      <div className="relative mx-auto" style={{ width: '300px', height: '300px' }}>
        {/* Hidden gift image */}
        <div className="absolute inset-0 bg-blue-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Gift size={64} className="text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-blue-800 mb-2">مبروك!</h3>
            <p className="text-blue-700">لقد فزت ببطاقة هدية!</p>
          </div>
        </div>
        
        {/* Scratch canvas */}
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="absolute inset-0 rounded-lg cursor-pointer"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">نسبة الخدش:</span>
          <span className="text-sm font-medium text-blue-600">{Math.round(scratchPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${scratchPercentage}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          اخدش 70% من البطاقة لكشف الهدية
        </p>
      </div>
      
      {gameCompleted && (
        <div className="mt-4 text-center">
          <Award size={32} className="text-green-600 mx-auto mb-2" />
          <p className="text-green-700 font-medium">
            مبروك! لقد كشفت عن الهدية!
          </p>
        </div>
      )}
    </div>
  );
};

export default DigitalScratchoff;