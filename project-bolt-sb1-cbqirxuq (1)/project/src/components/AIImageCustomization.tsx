import React, { useState, useEffect } from 'react';
import { Wand2, Image as ImageIcon, RefreshCw, Download, Check, Sparkles, Camera, Upload, Palette } from 'lucide-react';

// Mock AI-generated image data
const mockImageStyles = [
  { id: 'watercolor', name: 'Watercolor', preview: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
  { id: 'cartoon', name: 'Cartoon', preview: 'https://images.unsplash.com/photo-1569317002804-ab77bcf1bce4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
  { id: 'pixel', name: 'Pixel Art', preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
  { id: 'abstract', name: 'Abstract', preview: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
  { id: 'realistic', name: 'Realistic', preview: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
  { id: 'vintage', name: 'Vintage', preview: 'https://images.unsplash.com/photo-1530543787849-128d94430c6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }
];

const mockTemplates = [
  { id: 'birthday', name: 'Birthday', preview: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
  { id: 'congrats', name: 'Congratulations', preview: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
  { id: 'thankyou', name: 'Thank You', preview: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
  { id: 'holiday', name: 'Holiday', preview: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }
];

const AIImageCustomization = ({ onSelectImage }) => {
  const [activeTab, setActiveTab] = useState('generate');
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [transformedImage, setTransformedImage] = useState(null);
  const [transformStyle, setTransformStyle] = useState('cartoon');
  
  const handleGenerate = () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    setGeneratedImages([]);
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would call an AI image generation API
      const mockGeneratedImages = [
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1569317002804-ab77bcf1bce4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      ];
      
      setGeneratedImages(mockGeneratedImages);
      setIsGenerating(false);
    }, 2000);
  };
  
  const handleImageSelect = (image) => {
    setSelectedImage(image);
    if (onSelectImage) {
      onSelectImage(image);
    }
  };
  
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // In a real app, this would apply the template to the current design
  };
  
  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    // In a real app, this would update the style for generation
  };
  
  const handleTransform = () => {
    if (!uploadedImage) return;
    
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would call an AI image transformation API
      const transformedImageUrl = mockImageStyles.find(style => style.id === transformStyle)?.preview;
      setTransformedImage(transformedImageUrl);
      setIsGenerating(false);
    }, 1500);
  };
  
  const handleImageUpload = (e) => {
    // Simulate image upload
    setUploadedImage('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wand2 size={24} className="text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-800">AI Image Customization</h3>
        </div>
      </div>
      
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'generate'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('generate')}
        >
          Generate Image
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'transform'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('transform')}
        >
          Transform Photo
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'templates'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('templates')}
        >
          Templates
        </button>
      </div>
      
      {activeTab === 'generate' && (
        <div className="space-y-6">
          <div>
            <label htmlFor="imagePrompt" className="block text-sm font-medium text-gray-700 mb-1">
              Describe the image you want to create
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="imagePrompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., A birthday cake with colorful balloons"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              />
              <button
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
                className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                  !prompt || isGenerating
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={16} />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Choose a Style</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {mockImageStyles.map((style) => (
                <div
                  key={style.id}
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedStyle?.id === style.id
                      ? 'border-2 border-purple-500 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedStyle(style)}
                >
                  <div className="h-24 overflow-hidden">
                    <img src={style.preview} alt={style.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2 text-center">
                    <span className="text-sm font-medium text-gray-700">{style.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {generatedImages.length > 0 && (
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Generated Images</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {generatedImages.map((image, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedImage === image
                        ? 'border-2 border-purple-500 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                    onClick={() => handleImageSelect(image)}
                  >
                    <div className="h-32 overflow-hidden">
                      <img src={image} alt={`Generated ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2 flex justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageSelect(image);
                        }}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'transform' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload a Photo to Transform
            </label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition cursor-pointer"
              onClick={handleImageUpload}
            >
              <Upload size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                Click to upload an image or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG or GIF up to 5MB
              </p>
            </div>
          </div>
          
          {uploadedImage && (
            <>
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Your Photo</h4>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img src={uploadedImage} alt="Uploaded" className="w-full h-48 object-cover" />
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Choose a Style</h4>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {mockImageStyles.map((style) => (
                    <div
                      key={style.id}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                        transformStyle === style.id
                          ? 'border-2 border-purple-500 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                      onClick={() => setTransformStyle(style.id)}
                    >
                      <div className="h-20 overflow-hidden">
                        <img src={style.preview} alt={style.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-2 text-center">
                        <span className="text-xs font-medium text-gray-700">{style.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={handleTransform}
                  disabled={isGenerating}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                    isGenerating
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Transforming...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 size={16} />
                      <span>Transform Photo</span>
                    </>
                  )}
                </button>
              </div>
              
              {transformedImage && (
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">Transformed Image</h4>
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <img src={transformedImage} alt="Transformed" className="w-full h-48 object-cover" />
                  </div>
                  <div className="flex justify-center mt-3">
                    <button
                      onClick={() => handleImageSelect(transformedImage)}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium flex items-center space-x-2"
                    >
                      <Check size={16} />
                      <span>Use This Image</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Choose a Template</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {mockTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id
                      ? 'border-2 border-purple-500 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="h-32 overflow-hidden">
                    <img src={template.preview} alt={template.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2 text-center">
                    <span className="text-sm font-medium text-gray-700">{template.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <Sparkles size={16} className="text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-purple-700">
                  Templates provide pre-designed layouts for specific occasions. Select a template to quickly create a beautiful gift card image.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIImageCustomization;