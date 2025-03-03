import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Image as ImageIcon, Video as VideoIcon, X, Upload, Wand2, Sparkles } from 'lucide-react';
import AIPersonalization from './AIPersonalization';

const templates = [
  { id: 'birthday', name: 'عيد ميلاد', emoji: '🎂', color: 'bg-blue-600' },
  { id: 'congratulations', name: 'تهنئة', emoji: '🎉', color: 'bg-green-500' },
  { id: 'thankyou', name: 'شكراً', emoji: '💖', color: 'bg-blue-800' },
  { id: 'holiday', name: 'عطلة', emoji: '🎄', color: 'bg-red-500' },
  { id: 'wedding', name: 'زفاف', emoji: '💍', color: 'bg-blue-500' },
  { id: 'graduation', name: 'تخرج', emoji: '🎓', color: 'bg-yellow-500' },
  { id: 'celebration', name: 'احتفال', emoji: '🥂', color: 'bg-blue-700' },
  { id: 'love', name: 'حب', emoji: '❤️', color: 'bg-blue-800' }
];

const displayStyles = [
  { id: 'classic', name: 'كلاسيكي', description: 'عرض بسيط وأنيق' },
  { id: 'animated', name: 'متحرك', description: 'مع حركات جميلة' },
  { id: 'interactive', name: 'تفاعلي', description: 'يمكن للمستلمين التفاعل مع العناصر' },
  { id: '3d', name: 'تأثير ثلاثي الأبعاد', description: 'عرض ثلاثي الأبعاد مذهل' }
];

const PersonalizationPanel = ({ giftCardData, updateGiftCardData, nextStep, prevStep }) => {
  const [message, setMessage] = useState(giftCardData.personalization?.message || '');
  const [selectedTemplate, setSelectedTemplate] = useState(giftCardData.personalization?.template || 'birthday');
  const [mediaType, setMediaType] = useState(giftCardData.personalization?.media?.type || null);
  const [mediaPreview, setMediaPreview] = useState(giftCardData.personalization?.media?.preview || null);
  const [showAIHelper, setShowAIHelper] = useState(false);
  const [displayStyle, setDisplayStyle] = useState(giftCardData.personalization?.displayStyle || 'classic');
  const [showDisplayOptions, setShowDisplayOptions] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [imageFilters, setImageFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    grayscale: 0
  });

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleDisplayStyleSelect = (styleId) => {
    setDisplayStyle(styleId);
  };

  const handleMediaSelect = (type) => {
    setMediaType(type);
    // In a real app, this would trigger a file upload dialog
    if (type === 'image') {
      // Simulate image selection with a placeholder
      setMediaPreview('https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80');
      setShowImageEditor(true);
    } else if (type === 'video') {
      // Simulate video selection with a placeholder
      setMediaPreview('https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80');
    }
  };

  const clearMedia = () => {
    setMediaType(null);
    setMediaPreview(null);
    setShowImageEditor(false);
  };

  const handleSubmit = () => {
    updateGiftCardData({
      personalization: {
        message,
        template: selectedTemplate,
        displayStyle: displayStyle,
        media: mediaType ? { 
          type: mediaType, 
          preview: mediaPreview,
          filters: mediaType === 'image' ? imageFilters : null
        } : null
      }
    });
    nextStep();
  };

  const getTemplateStyle = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    return template ? template.color : 'bg-gray-500';
  };

  const handleAIMessageSelect = (aiMessage) => {
    setMessage(aiMessage);
    setShowAIHelper(false);
  };

  const handleAIGiftCardSelect = (cardId) => {
    // This would be handled in the parent component in a real app
    console.log(`Selected card: ${cardId}`);
    setShowAIHelper(false);
  };

  const handleFilterChange = (filter, value) => {
    setImageFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const getFilterStyle = () => {
    const { brightness, contrast, saturation, blur, grayscale } = imageFilters;
    return {
      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px) grayscale(${grayscale}%)`
    };
  };

  const renderTemplatePreview = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    
    return (
      <div className={`p-6 rounded-lg ${template.color} bg-opacity-10 border border-blue-200 transition-all duration-300`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{template.emoji}</span>
            <h4 className="font-bold text-blue-700">{template.name}</h4>
          </div>
          <div className={`w-10 h-10 rounded-full ${template.color} flex items-center justify-center`}>
            <span className="text-white text-xl">{template.emoji}</span>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-80 rounded-lg p-4 backdrop-blur-sm">
          <p className="italic text-gray-700">{message || 'رسالتك الشخصية ستظهر هنا...'}</p>
        </div>
        
        {mediaPreview && (
          <div className="mt-4 rounded-lg overflow-hidden border-2 border-white">
            <img 
              src={mediaPreview} 
              alt="Preview" 
              className="w-full h-32 object-cover"
              style={mediaType === 'image' ? getFilterStyle() : {}}
            />
          </div>
        )}
      </div>
    );
  };

  const renderImageEditor = () => {
    if (!showImageEditor || !mediaPreview || mediaType !== 'image') return null;

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-gray-800">تعديل الصورة</h4>
          <button
            onClick={() => setShowImageEditor(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-4">
          <img 
            src={mediaPreview} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg"
            style={getFilterStyle()}
          />
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">السطوع</label>
              <span className="text-sm text-gray-500">{imageFilters.brightness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={imageFilters.brightness}
              onChange={(e) => handleFilterChange('brightness', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">التباين</label>
              <span className="text-sm text-gray-500">{imageFilters.contrast}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={imageFilters.contrast}
              onChange={(e) => handleFilterChange('contrast', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">التشبع</label>
              <span className="text-sm text-gray-500">{imageFilters.saturation}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={imageFilters.saturation}
              onChange={(e) => handleFilterChange('saturation', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">الضبابية</label>
              <span className="text-sm text-gray-500">{imageFilters.blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={imageFilters.blur}
              onChange={(e) => handleFilterChange('blur', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">تدرج الرمادي</label>
              <span className="text-sm text-gray-500">{imageFilters.grayscale}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={imageFilters.grayscale}
              onChange={(e) => handleFilterChange('grayscale', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setImageFilters({
                brightness: 100,
                contrast: 100,
                saturation: 100,
                blur: 0,
                grayscale: 0
              })}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              إعادة ضبط
            </button>
            <button
              onClick={() => setShowImageEditor(false)}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              تم
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-right">اختر قالباً</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? `border-2 border-blue-500 shadow-md ${template.color} bg-opacity-10`
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-16 h-16 rounded-full ${template.color} flex items-center justify-center`}>
                  <span className="text-3xl">{template.emoji}</span>
                </div>
                <span className="font-medium text-gray-700">{template.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDisplayOptions && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h4 className="font-medium text-blue-800 mb-3 text-right">نمط العرض</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {displayStyles.map((style) => (
              <div
                key={style.id}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  displayStyle === style.id
                    ? 'border-2 border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => handleDisplayStyleSelect(style.id)}
              >
                <h5 className="font-medium text-gray-800 mb-1 text-right">{style.name}</h5>
                <p className="text-xs text-gray-600 text-right">{style.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowAIHelper(!showAIHelper)}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              <Wand2 size={16} />
              <span>{showAIHelper ? 'إخفاء المساعد الذكي' : 'اقتراحات ذكية'}</span>
            </button>
            <h3 className="text-xl font-semibold text-gray-800 text-right">أضف رسالة شخصية</h3>
          </div>
          
          {showAIHelper ? (
            <AIPersonalization 
              occasion={selectedTemplate} 
              recipient={giftCardData.recipient}
              onSelectMessage={handleAIMessageSelect}
              onSelectGiftCard={handleAIGiftCardSelect}
            />
          ) : (
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب رسالتك الشخصية هنا..."
              className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-right"
              dir="rtl"
            ></textarea>
          )}
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-right">إضافة وسائط (اختياري)</h3>
            
            {!mediaPreview ? (
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleMediaSelect('image')}
                  className="flex items-center space-x-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  <ImageIcon size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-700">إضافة صورة</span>
                </button>
                <button
                  onClick={() => handleMediaSelect('video')}
                  className="flex items-center space-x-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  <VideoIcon size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-700">إضافة فيديو</span>
                </button>
                <button
                  onClick={() => setShowAIHelper(true)}
                  className="flex items-center space-x-2 px-4 py-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
                >
                  <Sparkles size={20} className="text-blue-600" />
                  <span className="font-medium text-blue-700">صورة بالذكاء الاصطناعي</span>
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="rounded-lg overflow-hidden border border-gray-300">
                  <img 
                    src={mediaPreview} 
                    alt="Preview" 
                    className="w-full h-48 object-cover"
                    style={mediaType === 'image' ? getFilterStyle() : {}}
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={clearMedia}
                      className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <X size={18} className="text-gray-600" />
                    </button>
                    {mediaType === 'image' && (
                      <button
                        onClick={() => setShowImageEditor(!showImageEditor)}
                        className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <Wand2 size={18} className="text-blue-600" />
                      </button>
                    )}
                  </div>
                  <div className="p-3 bg-white border-t border-gray-300">
                    <p className="text-sm font-medium text-gray-700 text-right">
                      تمت إضافة {mediaType === 'image' ? 'صورة' : 'فيديو'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {renderImageEditor()}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-right">معاينة</h3>
          <div className={`rounded-lg overflow-hidden shadow-lg transition-all duration-500 ${
            displayStyle === 'animated' ? 'hover:scale-105' : 
            displayStyle === '3d' ? 'transform perspective-1000 hover:rotate-y-12 hover:shadow-xl' : ''
          }`}>
            {renderTemplatePreview()}
          </div>
          
          <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2 text-right">الخيارات المحددة</h4>
            <div className="flex flex-wrap gap-2 justify-end">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {templates.find(t => t.id === selectedTemplate)?.emoji} {templates.find(t => t.id === selectedTemplate)?.name}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                عرض {displayStyles.find(s => s.id === displayStyle)?.name}
              </span>
              {mediaType && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {mediaType === 'image' ? 'صورة' : 'فيديو'} مرفق
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setShowDisplayOptions(!showDisplayOptions)}
            className="mt-4 w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
          >
            {showDisplayOptions ? 'إخفاء خيارات العرض' : 'عرض خيارات العرض'}
          </button>
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
          <div className="flex items-center">
            <div className="flex items-center space-x-1">
              <span className="text-xl">{templates.find(t => t.id === selectedTemplate)?.emoji}</span>
              <span className="text-sm text-gray-600">
                قالب {templates.find(t => t.id === selectedTemplate)?.name}
              </span>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            <span>متابعة إلى التغليف</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationPanel;