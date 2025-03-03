import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Gift } from 'lucide-react';

const DigitalScratchCard = ({ onClose }) => {
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const canvasWidth = 300;
  const canvasHeight = 200;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    const context = canvas.getContext('2d');
    context.fillStyle = '#374151';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some decorative elements to the scratch layer
    context.strokeStyle = '#4B5563';
    context.lineWidth = 2;
    
    // Draw some patterns
    for (let i = 0; i < 10; i++) {
      context.beginPath();
      context.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      context.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      context.stroke();
    }
    
    // Add some text
    context.font = '16px Arial';
    context.fillStyle = '#9CA3AF';
    context.textAlign = 'center';
    context.fillText('Scratch here to reveal!', canvas.width / 2, canvas.height / 2);
    
    contextRef.current = context;
  }, []);
  
  const calculateScratchPercentage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;
    
    let transparentPixels = 0;
    let totalPixels = pixelData.length / 4;
    
    for (let i = 3; i < pixelData.length; i += 4) {
      if (pixelData[i] === 0) {
        transparentPixels++;
      }
    }
    
    const percentage = (transparentPixels / totalPixels) * 100;
    setScratchPercentage(percentage);
    
    if (percentage > 50 && !revealed) {
      setRevealed(true);
    }
  };
  
  const handleMouseDown = (e) => {
    setIsScratching(true);
    scratch(e);
  };
  
  const handleMouseMove = (e) => {
    if (!isScratching) return;
    scratch(e);
  };
  
  const handleMouseUp = () => {
    setIsScratching(false);
    calculateScratchPercentage();
  };
  
  const handleTouchStart = (e) => {
    setIsScratching(true);
    scratch(e.touches[0]);
  };
  
  const handleTouchMove = (e) => {
    if (!isScratching) return;
    e.preventDefault();
    scratch(e.touches[0]);
  };
  
  const handleTouchEnd = () => {
    setIsScratching(false);
    calculateScratchPercentage();
  };
  
  const scratch = (e) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, 15, 0, Math.PI * 2);
    context.fill();
  };
  
  const revealAll = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    
    context.globalCompositeOperation = 'destination-out';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    setRevealed(true);
    setScratchPercentage(100);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative bg-white text-gray-800 p-6 rounded-xl"
    >
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={onClose}
          className="p-2 bg-white hover:bg-gray-100 rounded-full shadow-md text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-yellow-500 rounded-full mb-4 text-white">
          <Gift className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Digital Scratch Card</h2>
        <p className="text-gray-600 mt-2">Scratch to reveal your surprise!</p>
      </div>
      
      <div className="max-w-md mx-auto">
        <div className="bg-gray-100 rounded-xl p-6 text-center">
          <p className="text-gray-700 mb-4">
            Use your finger or mouse to scratch the card below
          </p>
          
          <div className="relative mx-auto" style={{ width: canvasWidth, height: canvasHeight }}>
            {/* The content to be revealed */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex flex-col items-center justify-center"
            >
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="text-xl font-bold text-white mb-1">Congratulations!</h3>
              <p className="text-white text-sm">You've unlocked your gift!</p>
            </div>
            
            {/* The scratch layer */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 rounded-lg cursor-pointer touch-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-gray-300 rounded-full h-2.5 mb-2">
              <div 
                className="bg-yellow-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${scratchPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {scratchPercentage < 50 
                ? `Keep scratching! (${Math.round(scratchPercentage)}% revealed)`
                : 'Almost there!'}
            </p>
          </div>
          
          <button
            onClick={revealAll}
            className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm font-medium text-white"
          >
            Reveal All
          </button>
        </div>
        
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Your Gift is Ready!</h3>
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-lg mb-4">
              <div className="text-4xl mb-2">🎁</div>
              <p className="text-white font-bold">Special Gift Card</p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium text-white"
            >
              Continue to Gift
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DigitalScratchCard;