import React from 'react';
import { CheckCircle, Share2, Download, Copy, Gift, MessageCircle, Mail } from 'lucide-react';

const Confirmation = ({ giftCardData }) => {
  const getDeliveryIcon = () => {
    switch (giftCardData.deliveryMethod) {
      case 'email':
        return <Mail size={20} className="text-blue-500" />;
      case 'whatsapp':
      case 'sms':
        return <MessageCircle size={20} className="text-green-500" />;
      case 'social':
        return <Share2 size={20} className="text-pink-500" />;
      default:
        return <Gift size={20} className="text-purple-500" />;
    }
  };

  const getDeliveryText = () => {
    switch (giftCardData.deliveryMethod) {
      case 'email':
        return `Email to ${giftCardData.recipient.contact}`;
      case 'whatsapp':
        return `WhatsApp to ${giftCardData.recipient.contact}`;
      case 'sms':
        return `SMS to ${giftCardData.recipient.contact}`;
      case 'social':
        return `Social media to ${giftCardData.recipient.contact}`;
      default:
        return 'Not specified';
    }
  };

  const getScheduledText = () => {
    if (!giftCardData.scheduledDelivery) return null;
    
    const { date, time } = giftCardData.scheduledDelivery;
    if (!date || !time) return null;
    
    const formattedDate = new Date(date + 'T' + time).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    
    return `Scheduled for ${formattedDate}`;
  };

  const confirmationCode = 'GFT-' + Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Gift Card Sent Successfully!</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Your gift card has been {giftCardData.scheduledDelivery ? 'scheduled' : 'sent'} to {giftCardData.recipient.name}.
          {getScheduledText() && <span className="block mt-1 text-sm">{getScheduledText()}</span>}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-gray-800">Order Details</h4>
          <span className="text-sm text-gray-500">Confirmation #{confirmationCode}</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center overflow-hidden">
                {giftCardData.selectedCard?.logo ? (
                  <img src={giftCardData.selectedCard.logo} alt={giftCardData.selectedCard.name} className="w-10 h-10 object-contain" />
                ) : (
                  <Gift size={24} className="text-blue-500" />
                )}
              </div>
              <div>
                <h5 className="font-medium text-gray-800">{giftCardData.selectedCard?.name || 'Gift Card'}</h5>
                <p className="text-sm text-gray-600">${giftCardData.amount}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-medium text-gray-800">${giftCardData.amount}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 py-2">
            {getDeliveryIcon()}
            <span className="text-gray-700">{getDeliveryText()}</span>
          </div>
          
          <div className="pt-3 border-t border-gray-200 flex justify-between">
            <span className="text-gray-800 font-medium">Total Paid:</span>
            <span className="text-blue-600 font-bold">${giftCardData.amount}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h4 className="font-semibold text-gray-800 mb-4">Recipient Information</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{giftCardData.recipient.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Method:</span>
            <span className="font-medium">{giftCardData.deliveryMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Contact:</span>
            <span className="font-medium">{giftCardData.recipient.contact}</span>
          </div>
          {giftCardData.scheduledDelivery && (
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Time:</span>
              <span className="font-medium">{getScheduledText()}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
          <Share2 size={18} />
          <span>Share Gift Status</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition">
          <Download size={18} />
          <span>Download Receipt</span>
        </button>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">Want to track this gift?</p>
        <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
          <span className="font-mono text-gray-800">{confirmationCode}</span>
          <button className="text-blue-600 hover:text-blue-800">
            <Copy size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;