import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CreditCard, Lock } from 'lucide-react';

const PaymentCheckout = ({ giftCardData, updateGiftCardData, nextStep, prevStep }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      updateGiftCardData({
        paymentComplete: true
      });
      setIsProcessing(false);
      nextStep();
    }, 1500);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    
    return v;
  };

  const isFormValid = cardNumber.length >= 16 && cardName && expiryDate.length === 5 && cvv.length >= 3;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Information</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCard size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 4) setCvv(value);
                }}
                placeholder="123"
                maxLength={4}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center mt-4 text-sm text-gray-600">
            <Lock size={14} className="mr-1" />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </form>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-2">Order Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Gift Card:</span>
            <span className="font-medium">{giftCardData.selectedCard?.name || 'Not selected'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">${giftCardData.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Recipient:</span>
            <span className="font-medium">{giftCardData.recipient?.name || 'Not specified'}</span>
          </div>
          <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
            <span className="text-gray-800 font-medium">Total:</span>
            <span className="text-blue-600 font-bold">${giftCardData.amount}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100"
            disabled={isProcessing}
          >
            <ChevronLeft size={18} />
            <span>Back</span>
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isProcessing}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium ${
              !isFormValid || isProcessing
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <span>{isProcessing ? 'Processing...' : 'Complete Purchase'}</span>
            {!isProcessing && <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;