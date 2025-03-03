import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Mail, MessageCircle, Share2, Calendar, Clock, Eye } from 'lucide-react';

const deliveryOptions = [
  {
    id: 'email',
    name: 'Email',
    icon: <Mail size={24} className="text-blue-500" />,
    description: 'Send directly to their inbox'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: <MessageCircle size={24} className="text-green-500" />,
    description: 'Share via WhatsApp message'
  },
  {
    id: 'sms',
    name: 'SMS',
    icon: <MessageCircle size={24} className="text-purple-500" />,
    description: 'Send as a text message'
  },
  {
    id: 'social',
    name: 'Social Media',
    icon: <Share2 size={24} className="text-pink-500" />,
    description: 'Share on social platforms'
  }
];

const DeliveryMethod = ({ giftCardData, updateGiftCardData, nextStep, prevStep }) => {
  const [deliveryMethod, setDeliveryMethod] = useState(giftCardData.deliveryMethod || '');
  const [recipientContact, setRecipientContact] = useState(giftCardData.recipient?.contact || '');
  const [scheduleDelivery, setScheduleDelivery] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  
  const handleDeliverySelect = (methodId) => {
    setDeliveryMethod(methodId);
  };

  const handleSubmit = () => {
    updateGiftCardData({
      deliveryMethod,
      recipient: {
        ...giftCardData.recipient,
        contact: recipientContact
      },
      scheduledDelivery: scheduleDelivery ? {
        date: deliveryDate,
        time: deliveryTime
      } : null,
      paymentComplete: true
    });
    nextStep();
  };

  const getContactPlaceholder = () => {
    switch (deliveryMethod) {
      case 'email':
        return 'Enter recipient\'s email address';
      case 'whatsapp':
      case 'sms':
        return 'Enter recipient\'s phone number';
      case 'social':
        return 'Enter recipient\'s username';
      default:
        return 'Enter recipient\'s contact information';
    }
  };

  const getContactLabel = () => {
    switch (deliveryMethod) {
      case 'email':
        return 'Email Address';
      case 'whatsapp':
      case 'sms':
        return 'Phone Number';
      case 'social':
        return 'Username';
      default:
        return 'Contact Information';
    }
  };

  const isNextDisabled = !deliveryMethod || !recipientContact || (scheduleDelivery && (!deliveryDate || !deliveryTime));

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Delivery Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliveryOptions.map((option) => (
            <div
              key={option.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                deliveryMethod === option.id
                  ? 'border-2 border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => handleDeliverySelect(option.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {option.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{option.name}</h4>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {deliveryMethod && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recipient Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="recipientContact" className="block text-sm font-medium text-gray-700 mb-1">
                {getContactLabel()}
              </label>
              <input
                type="text"
                id="recipientContact"
                value={recipientContact}
                onChange={(e) => setRecipientContact(e.target.value)}
                placeholder={getContactPlaceholder()}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {deliveryMethod && (
        <div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="scheduleDelivery"
              checked={scheduleDelivery}
              onChange={(e) => setScheduleDelivery(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="scheduleDelivery" className="ml-2 block text-sm text-gray-700">
              Schedule for later delivery
            </label>
          </div>
          
          {scheduleDelivery && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
              <div>
                <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Calendar size={16} className="mr-1 text-gray-500" />
                  Delivery Date
                </label>
                <input
                  type="date"
                  id="deliveryDate"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Clock size={16} className="mr-1 text-gray-500" />
                  Delivery Time
                </label>
                <input
                  type="time"
                  id="deliveryTime"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          )}
        </div>
      )}

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
          >
            <ChevronLeft size={18} />
            <span>Back</span>
          </button>
          <button
            onClick={handleSubmit}
            disabled={isNextDisabled}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium ${
              isNextDisabled
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <span>Complete Purchase</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMethod;