import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Mail, Link, Printer, Check, Gift, Music, Smartphone } from 'lucide-react';

const designTemplates = [
  { 
    id: 'birthday1', 
    name: 'Birthday Celebration', 
    occasion: 'birthday',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    previewText: 'Happy Birthday!'
  },
  { 
    id: 'birthday2', 
    name: 'Birthday Party', 
    occasion: 'birthday',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    previewText: 'Make a wish!'
  },
  { 
    id: 'graduation1', 
    name: 'Graduation Cap', 
    occasion: 'graduation',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    previewText: 'Congratulations Graduate!'
  },
  { 
    id: 'wedding1', 
    name: 'Wedding Bells', 
    occasion: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    previewText: 'Congratulations on your special day!'
  },
  { 
    id: 'newbaby1', 
    name: 'Baby Welcome', 
    occasion: 'newBaby',
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    previewText: 'Welcome to the world!'
  },
  { 
    id: 'holiday1', 
    name: 'Holiday Cheer', 
    occasion: 'holiday',
    imageUrl: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    previewText: 'Happy Holidays!'
  }
];

const cardTypes = [
  { id: 'likecard', name: 'LikeCard Balance', icon: '💳' },
  { id: 'itunes', name: 'iTunes', icon: '🎵' },
  { id: 'playstation', name: 'PlayStation', icon: '🎮' },
  { id: 'xbox', name: 'XBOX', icon: '🎯' },
  { id: 'steam', name: 'STEAM', icon: '🎲' },
  { id: 'pubg', name: 'PUBG', icon: '🔫' },
  { id: 'stc', name: 'STC', icon: '📱' }
];

const DeliveryOptions = ({ giftData, updateGiftData, nextStep, prevStep }) => {
  const [deliveryMethod, setDeliveryMethod] = useState(giftData.delivery?.method || 'whatsapp');
  const [recipientContact, setRecipientContact] = useState(giftData.delivery?.recipientContact || '');
  const [senderName, setSenderName] = useState(giftData.delivery?.senderName || '');
  const [scheduleDelivery, setScheduleDelivery] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [errors, setErrors] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [recipientPreviewMode, setRecipientPreviewMode] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!recipientContact) {
      newErrors.recipientContact = 'Recipient contact is required';
    } else if (deliveryMethod === 'whatsapp' && !recipientContact.match(/^\+?[0-9]{10,15}$/)) {
      newErrors.recipientContact = 'Please enter a valid phone number';
    } else if (deliveryMethod === 'email' && !recipientContact.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.recipientContact = 'Please enter a valid email address';
    }
    
    if (!senderName) {
      newErrors.senderName = 'Your name is required';
    }
    
    if (scheduleDelivery) {
      if (!deliveryDate) {
        newErrors.deliveryDate = 'Delivery date is required';
      }
      if (!deliveryTime) {
        newErrors.deliveryTime = 'Delivery time is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDelivery = () => {
    if (validateForm()) {
      updateGiftData({
        delivery: {
          method: deliveryMethod,
          recipientContact,
          senderName,
          scheduled: scheduleDelivery,
          scheduledDate: scheduleDelivery ? `${deliveryDate} ${deliveryTime}` : null
        }
      });
      return true;
    }
    return false;
  };

  const handleContinue = () => {
    if (handleSaveDelivery()) {
      nextStep();
    }
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const toggleRecipientPreviewMode = () => {
    setRecipientPreviewMode(!recipientPreviewMode);
  };

  const selectedTemplate = designTemplates.find(t => t.id === giftData.designTemplate) || {};
  const selectedCardType = cardTypes.find(t => t.id === giftData.cardType) || cardTypes[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-4"
    >
      {previewMode ? (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Delivery Preview</h3>
              <button 
                onClick={togglePreviewMode}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 sm:p-8">
              <h4 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6 flex items-center">
                <Send className="w-5 h-5 mr-2 text-orange-400" />
                Recipient Experience
              </h4>
              
              <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700">
                {deliveryMethod === 'whatsapp' && (
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mb-3 sm:mb-0 sm:mr-4 mx-auto sm:mx-0">
                      W
                    </div>
                    <div className="flex-1 bg-green-800 bg-opacity-30 p-3 sm:p-4 rounded-xl">
                      <p className="text-base sm:text-lg text-green-300 mb-2">WhatsApp Message</p>
                      <p className="text-sm sm:text-base mb-3">
                        Hi there! {senderName || 'Your friend'} sent you a {giftData.cardValue} SAR gift card for {giftData.occasion}! 
                        Click the link below to open your gift. 🎁
                      </p>
                      <div className="mt-3 bg-blue-900 bg-opacity-30 text-blue-300 text-xs sm:text-sm p-2 sm:p-3 rounded-lg">
                        https://likecard.com/gift/abc123
                      </div>
                    </div>
                  </div>
                )}
                
                {deliveryMethod === 'email' && (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mr-2 sm:mr-3">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base text-purple-300">Email Subject: You've received a gift from {senderName || 'a friend'}! 🎁</p>
                      </div>
                    </div>
                    <div className="bg-gray-800 p-3 sm:p-5 rounded-xl">
                      <p className="text-sm sm:text-base mb-2 sm:mb-3">
                        Hi there!
                      </p>
                      <p className="text-sm sm:text-base mb-3 sm:mb-4">
                        {senderName || 'Someone special'} has sent you a {giftData.cardValue} SAR gift card for {giftData.occasion}!
                      </p>
                      <div className="bg-blue-900 bg-opacity-30 p-3 sm:p-5 rounded-xl text-center mb-3 sm:mb-4">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium">
                          Open Your Gift
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400">
                        If the button doesn't work, copy and paste this link: https://likecard.com/gift/abc123
                      </p>
                    </div>
                  </div>
                )}
                
                {deliveryMethod === 'sms' && (
                  <div className="bg-blue-900 bg-opacity-20 p-3 sm:p-5 rounded-xl border border-blue-800">
                    <p className="text-sm sm:text-base text-blue-300 mb-1 sm:mb-2">SMS Message</p>
                    <p className="text-sm sm:text-base">
                      🎁 You've received a {giftData.cardValue} SAR gift card from {senderName || 'a friend'} for {giftData.occasion}! Open your gift here: https://likecard.com/gift/abc123
                    </p>
                  </div>
                )}
                
                {deliveryMethod === 'link' && (
                  <div className="text-center p-4 sm:p-6">
                    <div className="inline-block bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl mb-3 sm:mb-4 text-sm sm:text-lg">
                      <Link className="w-4 h-4 sm:w-6 sm:h-6 inline-block mr-1 sm:mr-2" />
                      Share Link
                    </div>
                    <p className="text-sm sm:text-lg mb-3 sm:mb-4">
                      A unique link will be generated for you to share with {recipientContact || 'the recipient'}.
                    </p>
                    <div className="bg-gray-800 p-2 sm:p-3 rounded-lg sm:rounded-xl flex items-center justify-between">
                      <span className="text-xs sm:text-base text-gray-300 truncate">https://likecard.com/gift/abc123</span>
                      <button className="bg-gray-700 hover:bg-gray-600 p-1 sm:p-2 rounded-lg">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
                
                {scheduleDelivery && deliveryDate && deliveryTime && (
                  <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-gray-400">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Scheduled for delivery on {new Date(`${deliveryDate}T${deliveryTime}`).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 sm:mt-6 flex justify-center">
              <button
                onClick={togglePreviewMode}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium text-sm sm:text-lg text-white"
              >
                Return to Editor
              </button>
            </div>
          </div>
        </div>
      ) : recipientPreviewMode ? (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Recipient View</h3>
              <button 
                onClick={toggleRecipientPreviewMode}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="flex justify-center">
              <div className="w-64 sm:w-80 h-[500px] sm:h-[600px] bg-black rounded-3xl border-8 border-gray-800 overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex justify-center items-center">
                  <div className="w-20 h-1 bg-gray-600 rounded-full"></div>
                </div>
                
                <div className="h-full bg-gradient-to-b from-purple-600 to-blue-600 pt-8 px-4 overflow-y-auto">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
                    <div className="relative h-40 bg-gray-100">
                      <img 
                        src={selectedTemplate.imageUrl || "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                        alt="Gift card background"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                      <div className="absolute bottom-0 left-0 p-3">
                        <h3 className="text-white font-bold text-lg">
                          {giftData.customizations?.recipientName 
                            ? `Dear ${giftData.customizations.recipientName}` 
                            : "Happy Birthday!"}
                        </h3>
                        <p className="text-white text-xs">
                          {giftData.customizations?.message?.substring(0, 60) || "Wishing you a wonderful day!"}...
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                            {selectedCardType.icon}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{selectedCardType.name}</p>
                            <p className="text-xs text-gray-500">Gift Card</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-500 text-lg">{giftData.cardValue} SAR</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 p-3 rounded-lg mb-3">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-gray-500">Card Number:</span>
                          <span className="font-medium">XXXX-XXXX-XXXX-XXXX</span>
                        </div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-gray-500">Redemption Code:</span>
                          <span className="font-medium">XXXX-XXXX-XXXX</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500">Valid Until:</span>
                          <span className="font-medium">12/31/2025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">Delivery Options <span className="text-orange-500">📬</span></h2>
          <p className="text-gray-600 text-center mb-6 sm:mb-8 text-base sm:text-lg">
            Choose how and when to deliver your gift
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Delivery Method & Recipient Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg sm:text-xl font-medium mb-4 text-gray-700 flex items-center">
                  <Send className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-500" />
                  Select Delivery Method
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('whatsapp')}
                    className={`p-3 sm:p-4 rounded-lg flex flex-col items-center justify-center h-20 sm:h-24 transition-all
                      ${deliveryMethod === 'whatsapp' 
                        ? 'bg-green-100 ring-2 ring-green-500 text-green-700' 
                        : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'}
                    `}
                  >
                    <MessageSquare className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${deliveryMethod === 'whatsapp' ? 'text-green-600' : 'text-green-500'}`} />
                    <span className="font-medium text-xs sm:text-sm">WhatsApp</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('sms')}
                    className={`p-3 sm:p-4 rounded-lg flex flex-col items-center justify-center h-20 sm:h-24 transition-all
                      ${deliveryMethod === 'sms' 
                        ? 'bg-blue-100 ring-2 ring-blue-500 text-blue-700' 
                        : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'}
                    `}
                  >
                    <MessageSquare className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${deliveryMethod === 'sms' ? 'text-blue-600' : 'text-blue-500'}`} />
                    <span className="font-medium text-xs sm:text-sm">SMS</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('email')}
                    className={`p-3 sm:p-4 rounded-lg flex flex-col items-center justify-center h-20 sm:h-24 transition-all
                      ${deliveryMethod === 'email' 
                        ? 'bg-purple-100 ring-2 ring-purple-500 text-purple-700' 
                        : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'}
                    `}
                  >
                    <Mail className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${deliveryMethod === 'email' ? 'text-purple-600' : 'text-purple-500'}`} />
                    <span className="font-medium text-xs sm:text-sm">Email</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('link')}
                    className={`p-3 sm:p-4 rounded-lg flex flex-col items-center justify-center h-20 sm:h-24 transition-all
                      ${deliveryMethod === 'link' 
                        ? 'bg-orange-100 ring-2 ring-orange-500 text-orange-700' 
                        : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'}
                    `}
                  >
                    <Link className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${deliveryMethod === 'link' ? 'text-orange-600' : 'text-orange-500'}`} />
                    <span className="font-medium text-xs sm:text-sm">Share Link</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg sm:text-xl font-medium mb-4 text-gray-700">Recipient Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      {deliveryMethod === 'whatsapp' || deliveryMethod === 'sms' 
                        ? 'Recipient Phone Number' 
                        : deliveryMethod === 'email' 
                          ? 'Recipient Email Address'
                          : 'Recipient Name (optional)'}
                    </label>
                    <input
                      type={deliveryMethod === 'email' ? 'email' : deliveryMethod === 'whatsapp' || deliveryMethod === 'sms' ? 'tel' : 'text'}
                      value={recipientContact}
                      onChange={(e) => setRecipientContact(e.target.value)}
                      placeholder={
                        deliveryMethod === 'whatsapp' || deliveryMethod === 'sms' 
                          ? 'Enter phone number' 
                          : deliveryMethod === 'email' 
                            ? 'Enter email address'
                            : 'Enter recipient name (optional)'
                      }
                      className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm
                        ${errors.recipientContact ? 'border-red-500' : 'border-gray-300'}
                      `}
                    />
                    {errors.recipientContact && (
                      <p className="mt-1 text-xs text-red-500">{errors.recipientContact}</p>
                    )}
                    {(deliveryMethod === 'whatsapp' || deliveryMethod === 'sms') && (
                      <p className="mt-1 text-xs text-gray-500">Include country code (e.g., +966 for Saudi Arabia)</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Your Name</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Enter your name"
                      className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm
                        ${errors.senderName ? 'border-red-500' : 'border-gray-300'}
                      `}
                    />
                    {errors.senderName && (
                      <p className="mt-1 text-xs text-red-500">{errors.senderName}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-3">
                  <input
                    id="schedule-delivery"
                    type="checkbox"
                    checked={scheduleDelivery}
                    onChange={() => setScheduleDelivery(!scheduleDelivery)}
                    className="w-4 h-4 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                  />
                  <label htmlFor="schedule-delivery" className="ml-2 text-sm font-medium text-gray-700">
                    Schedule delivery for later
                  </label>
                </div>
                
                {scheduleDelivery && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm
                          ${errors.deliveryDate ? 'border-red-500' : 'border-gray-300'}
                        `}
                      />
                      {errors.deliveryDate && (
                        <p className="mt-1 text-xs text-red-500">{errors.deliveryDate}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
                      <input
                        type="time"
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm
                          ${errors.deliveryTime ? 'border-red-500' : 'border-gray-300'}
                        `}
                      />
                      {errors.deliveryTime && (
                        <p className="mt-1 text-xs text-red-500">{errors.deliveryTime}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {deliveryMethod !== 'link' && (
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                  <Printer className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 mr-3 sm:mr-4" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm sm:text-base text-gray-700">Also include printable version</h4>
                    <p className="text-xs text-gray-500">A printable PDF with QR code will be included in the delivery</p>
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="relative w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Preview */}
            <div className="lg:col-span-5">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium flex items-center text-gray-700">
                    <Send className="w-5 h-5 mr-2 text-orange-500" />
                    Delivery Preview
                  </h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={toggleRecipientPreviewMode}
                      className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs flex items-center text-white"
                    >
                      <Smartphone className="w-3 h-3 mr-1" />
                      Mobile View
                    </button>
                    <button 
                      onClick={togglePreviewMode}
                      className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs flex items-center text-white"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      Full Preview
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  {deliveryMethod === 'whatsapp' && (
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mb-2 sm:mb-0 sm:mr-3 mx-auto sm:mx-0">
                        W
                      </div>
                      <div className="flex-1 bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200">
                        <p className="text-xs text-green-700 mb-1">WhatsApp Message</p>
                        <p className="text-xs text-gray-700">
                          Hi there! {senderName || 'Your friend'} sent you a {giftData.cardValue} SAR gift card for {giftData.occasion}! 
                          Click the link below to open your gift. 🎁
                        </p>
                        <div className="mt-2 bg-blue-50 text-blue-700 text-xs p-1 sm:p-2 rounded border border-blue-200">
                          https://likecard.com/gift/abc123
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {deliveryMethod === 'email' && (
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mr-2">
                          <Mail className="w-3 h-3" />
                        </div>
                        <div>
                          <p className="text-xs text-purple-700">Email Subject: You've received a gift from {senderName || 'a friend'}! 🎁</p>
                        </div>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <p className="text-xs mb-1 text-gray-700">
                          Hi there!
                        </p>
                        <p className="text-xs mb-2 text-gray-700">
                          {senderName || 'Someone special'} has sent you a {giftData.cardValue} SAR gift card for {giftData.occasion}!
                        </p>
                        <div className="bg-blue-50 p-2 rounded-lg text-center mb-2 border border-blue-100">
                          <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-medium">
                            Open Your Gift
                          </button>
                        </div>
                        <p className="text-xs text-gray-500">
                          If the button doesn't work, copy and paste this link: https://likecard.com/gift/abc123
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {deliveryMethod === 'sms' && (
                    <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-700 mb-1">SMS Message</p>
                      <p className="text-xs text-gray-700">
                        🎁 You've received a {giftData.cardValue} SAR gift card from {senderName || 'a friend'} for {giftData.occasion}! Open your gift here: https://likecard.com/gift/abc123
                      </p>
                    </div>
                  )}
                  
                  {deliveryMethod === 'link' && (
                    <div className="text-center">
                      <div className="inline-block bg-orange-500 text-white px-3 py-1 rounded-lg mb-2">
                        <Link className="w-4 h-4 inline-block mr-1" />
                        Share Link
                      </div>
                      <p className="text-xs mb-2 text-gray-700">
                        A unique link will be generated for you to share with {recipientContact || 'the recipient'}.
                      </p>
                      <div className="bg-white p-2 rounded-lg flex items-center justify-between border border-gray-200">
                        <span className="text-xs text-gray-700 truncate">https://likecard.com/gift/abc123</span>
                        <button className="bg-gray-100 hover:bg-gray-200 p-1 rounded text-gray-700">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {scheduleDelivery && deliveryDate && deliveryTime && (
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Scheduled for delivery on {new Date(`${deliveryDate}T${deliveryTime}`).toLocaleString()}
                    </div>
                  )}
                </div>
                
                <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex items-center">
                    <Gift className="w-5 h-5 text-orange-500 mr-2" />
                    <h4 className="font-medium text-sm text-gray-700">Recipient Experience</h4>
                  </div>
                  <p className="mt-2 text-xs text-gray-600">
                    After opening the link, your recipient will:
                  </p>
                  <ul className="mt-2 space-y-2 text-xs text-gray-600">
                    <li className="flex items-start">
                      <span className="inline-block w-4 h-4 bg-orange-100 rounded-full text-orange-500 flex-shrink-0 mr-2 text-center">1</span>
                      <span>See your personalized message and card design</span>
                    </li>
                    {giftData.games && giftData.games.length > 0 && (
                      <li className="flex items-start">
                        <span className="inline-block w-4 h-4 bg-orange-100 rounded-full text-orange-500 flex-shrink-0 mr-2 text-center">2</span>
                        <span>Play interactive games before revealing the gift</span>
                      </li>
                    )}
                    <li className="flex items-start">
                      <span className="inline-block w-4 h-4 bg-orange-100 rounded-full text-orange-500 flex-shrink-0 mr-2 text-center">{giftData.games && giftData.games.length > 0 ? '3' : '2'}</span>
                      <span>Unwrap the gift with your selected animation style</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-4 h-4 bg-orange-100 rounded-full text-orange-500 flex-shrink-0 mr-2 text-center">{giftData.games && giftData.games.length > 0 ? '4' : '3'}</span>
                      <span>Redeem their {giftData.cardValue} SAR {cardTypes.find(c => c.id === giftData.cardType)?.name || 'Gift Card'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex justify-between">
            <button
              onClick={prevStep}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back
            </button>
            <button
              onClick={handleContinue}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500 flex items-center text-sm sm:text-base"
            >
              Review & Pay
              <Check className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default DeliveryOptions;