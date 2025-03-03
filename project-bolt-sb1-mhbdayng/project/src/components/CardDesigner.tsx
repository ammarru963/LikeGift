import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';

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
  },
];

const CardDesigner = ({ giftData, updateGiftData, nextStep, prevStep }) => {
  const [recipientName, setRecipientName] = useState(giftData.customizations?.recipientName || '');
  const [message, setMessage] = useState(giftData.customizations?.message || '');
  const [relationship, setRelationship] = useState(giftData.customizations?.relationship || '');
  const [tone, setTone] = useState(giftData.customizations?.tone || 'friendly');
  const [previewMode, setPreviewMode] = useState(false);

  const filteredTemplates = designTemplates.filter(
    template => template.occasion === giftData.occasion || giftData.occasion === 'custom'
  );

  const handleTemplateSelect = (templateId) => {
    updateGiftData({ 
      designTemplate: templateId,
      customizations: {
        ...giftData.customizations,
        recipientName,
        message,
        relationship,
        tone
      }
    });
  };

  const handleCustomizationSave = () => {
    updateGiftData({
      customizations: {
        ...giftData.customizations,
        recipientName,
        message,
        relationship,
        tone
      }
    });
  };

  const handleGenerateAI = () => {
    // Simulate AI generation
    const aiGeneratedMessage = `Dear ${recipientName || 'friend'},\n\nWishing you the most wonderful ${giftData.occasion} filled with joy and happiness! ${relationship ? `As your ${relationship}, ` : ''}I wanted to make this day special for you.\n\nEnjoy your gift!\n\n`;
    
    setMessage(aiGeneratedMessage);
    handleCustomizationSave();
  };

  const selectedTemplate = designTemplates.find(t => t.id === giftData.designTemplate) || {};

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

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
              <h3 className="text-xl sm:text-2xl font-bold text-white">Design Preview</h3>
              <button 
                onClick={togglePreviewMode}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="relative overflow-hidden rounded-xl h-64 sm:h-80 md:h-96 bg-gray-900">
              <img 
                src={selectedTemplate.imageUrl} 
                alt={selectedTemplate.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 text-center">
                <div className="bg-black bg-opacity-50 p-4 sm:p-6 md:p-8 rounded-xl max-w-md">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-white">
                    {recipientName 
                      ? `Dear ${recipientName}` 
                      : selectedTemplate.previewText}
                  </h2>
                  {message && (
                    <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-white">{message}</p>
                  )}
                  <div className="mt-4 sm:mt-6 text-orange-400 font-bold text-lg sm:text-xl md:text-2xl">
                    {giftData.cardValue} SAR Gift Card
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-6 flex justify-center">
              <button
                onClick={togglePreviewMode}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium text-white"
              >
                Return to Editor
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">Design Your Card <span className="text-orange-500">🎨</span></h2>
          <p className="text-gray-600 text-center mb-6 sm:mb-8 text-base sm:text-lg">
            Personalize your {giftData.cardValue} SAR gift card for {giftData.occasionEmoji} {giftData.occasion.charAt(0).toUpperCase() + giftData.occasion.slice(1)}
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Templates & Upload */}
            <div className="lg:col-span-7 space-y-6">
              {/* Templates Section */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2" />
                  <h3 className="text-lg sm:text-xl font-medium">Choose a Template</h3>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {filteredTemplates.length > 0 ? (
                    filteredTemplates.map((template) => (
                      <div 
                        key={template.id}
                        onClick={() => handleTemplateSelect(template.id)}
                        className={`
                          relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 h-24 sm:h-32
                          ${giftData.designTemplate === template.id 
                            ? 'ring-3 ring-orange-400 shadow-md' 
                            : 'ring-1 ring-gray-200'}
                        `}
                      >
                        <img 
                          src={template.imageUrl} 
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                        <div className="absolute bottom-0 left-0 p-2">
                          <h3 className="text-white font-medium text-xs sm:text-sm">{template.name}</h3>
                        </div>
                        {giftData.designTemplate === template.id && (
                          <div className="absolute top-1 right-1 bg-orange-500 rounded-full p-1">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-6 text-gray-500">
                      <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 opacity-50" />
                      <p className="text-sm sm:text-base">No templates available for this occasion. Try the custom option or upload your own image.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Upload Section */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2" />
                  <h3 className="text-lg sm:text-xl font-medium">Upload Your Own Image</h3>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4 text-gray-400" />
                  <p className="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">Drag and drop an image here, or click to select a file</p>
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700">
                    Select Image
                  </button>
                  <p className="mt-3 sm:mt-4 text-xs text-gray-500">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Customization & Preview */}
            <div className="lg:col-span-5 space-y-6">
              {/* Customization Section */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2" />
                  <h3 className="text-lg sm:text-xl font-medium">Customize Your Message</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recipient's Name</label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Enter recipient's name"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Relationship</label>
                      <select
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      >
                        <option value="">Select relationship</option>
                        <option value="friend">Friend</option>
                        <option value="family">Family Member</option>
                        <option value="colleague">Colleague</option>
                        <option value="partner">Partner</option>
                        <option value="classmate">Classmate</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message Tone</label>
                    <div className="flex flex-wrap gap-2">
                      {['friendly', 'formal', 'funny', 'heartfelt', 'inspirational'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setTone(t)}
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${tone === t ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">Personal Message</label>
                      <button
                        onClick={handleGenerateAI}
                        className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center text-white"
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Generate with AI
                      </button>
                    </div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write a personal message or generate one with AI"
                      rows={3}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    ></textarea>
                  </div>
                  
                  <button
                    onClick={handleCustomizationSave}
                    className="w-full py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium text-sm text-white"
                  >
                    Save Customization
                  </button>
                </div>
              </div>
              
              {/* Preview Section */}
              {giftData.designTemplate && (
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-gray-700">Preview</h3>
                    <button 
                      onClick={togglePreviewMode}
                      className="px-2 sm:px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs flex items-center text-white"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      Full Screen
                    </button>
                  </div>
                  <div className="relative overflow-hidden rounded-lg h-40 sm:h-48 bg-gray-100">
                    <img 
                      src={selectedTemplate.imageUrl} 
                      alt={selectedTemplate.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-3 sm:p-4 text-center">
                      <div className="bg-black bg-opacity-50 p-2 sm:p-3 rounded-lg max-w-xs">
                        <h2 className="text-base sm:text-lg font-bold mb-1 text-white">
                          {recipientName 
                            ? `Dear ${recipientName}` 
                            : selectedTemplate.previewText}
                        </h2>
                        {message && (
                          <p className="text-xs text-white">{message.substring(0, 60)}...</p>
                        )}
                        <div className="mt-1 sm:mt-2 text-orange-400 font-bold text-sm sm:text-base">
                          {giftData.cardValue} SAR Gift Card
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
              onClick={nextStep}
              disabled={!giftData.designTemplate}
              className={`
                px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center text-sm sm:text-base
                ${giftData.designTemplate 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
              `}
            >
              Continue
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default CardDesigner;