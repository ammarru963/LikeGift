import React, { useState } from 'react';
import { Gift as GiftCard, Gift, Send, Image, Video, MessageSquare, Share2, CheckCircle, ChevronRight, Mail, Phone, MessageCircle, Eye, Bell, Wand2, Gamepad2 } from 'lucide-react';
import GiftCardSelection from './components/GiftCardSelection';
import PersonalizationPanel from './components/PersonalizationPanel';
import DigitalWrapping from './components/DigitalWrapping';
import DeliveryMethod from './components/DeliveryMethod';
import PaymentCheckout from './components/PaymentCheckout';
import Confirmation from './components/Confirmation';
import GiftPreview from './components/GiftPreview';
import AIImageCustomization from './components/AIImageCustomization';
import EventReminder from './components/EventReminder';

function App() {
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [showAIImageCustomizer, setShowAIImageCustomizer] = useState(false);
  const [showEventReminder, setShowEventReminder] = useState(false);
  const [giftCardData, setGiftCardData] = useState({
    selectedCard: null,
    amount: 25,
    recipient: {
      name: '',
      contact: ''
    },
    personalization: {
      message: '',
      media: null,
      template: 'birthday',
      displayStyle: 'classic'
    },
    wrapping: {
      style: 'standard',
      interactive: false,
      animation: 'none',
      customGame: null
    },
    deliveryMethod: '',
    paymentComplete: false
  });

  const updateGiftCardData = (data) => {
    setGiftCardData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const toggleAIImageCustomizer = () => {
    setShowAIImageCustomizer(!showAIImageCustomizer);
  };

  const toggleEventReminder = () => {
    setShowEventReminder(!showEventReminder);
  };

  const renderStepIndicator = () => {
    return (
      <div className="w-full max-w-3xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4, 5].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div 
                className={`flex flex-col items-center ${step >= stepNumber ? 'text-blue-600' : 'text-gray-400'}`}
                onClick={() => step > stepNumber && setStep(stepNumber)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= stepNumber ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                  {stepNumber === 1 && <GiftCard size={20} />}
                  {stepNumber === 2 && <MessageSquare size={20} />}
                  {stepNumber === 3 && <Gift size={20} />}
                  {stepNumber === 4 && <Send size={20} />}
                  {stepNumber === 5 && <CheckCircle size={20} />}
                </div>
                <span className="text-xs font-medium hidden sm:block">
                  {stepNumber === 1 && 'اختيار البطاقة'}
                  {stepNumber === 2 && 'تخصيص'}
                  {stepNumber === 3 && 'تغليف'}
                  {stepNumber === 4 && 'التوصيل'}
                  {stepNumber === 5 && 'تأكيد'}
                </span>
              </div>
              {stepNumber < 5 && (
                <div className={`flex-1 h-1 mx-2 ${step > stepNumber ? 'bg-blue-400' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <GiftCardSelection giftCardData={giftCardData} updateGiftCardData={updateGiftCardData} nextStep={nextStep} />;
      case 2:
        return <PersonalizationPanel giftCardData={giftCardData} updateGiftCardData={updateGiftCardData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <DigitalWrapping giftCardData={giftCardData} updateGiftCardData={updateGiftCardData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <DeliveryMethod giftCardData={giftCardData} updateGiftCardData={updateGiftCardData} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Confirmation giftCardData={giftCardData} prevStep={prevStep} />;
      default:
        return <GiftCardSelection giftCardData={giftCardData} updateGiftCardData={updateGiftCardData} nextStep={nextStep} />;
    }
  };

  const isPreviewAvailable = giftCardData.selectedCard && (step > 1 && step < 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GiftCard className="text-blue-600" size={28} />
            <h1 className="text-xl font-bold text-gray-800">LikeGift</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">الرئيسية</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">بطاقات الهدايا</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">كيف تعمل</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">الدعم</a>
          </nav>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">تسجيل الدخول</button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">إرسال بطاقة هدية</h2>
          <p className="text-center text-gray-600 mb-8">أنشئ تجربة بطاقة هدية مخصصة في بضع خطوات فقط</p>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={toggleAIImageCustomizer}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition"
            >
              <Wand2 size={18} />
              <span>منشئ الصور بالذكاء الاصطناعي</span>
            </button>
            <button
              onClick={toggleEventReminder}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
            >
              <Bell size={18} />
              <span>تذكير بالمناسبات</span>
            </button>
          </div>
          
          {renderStepIndicator()}
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 relative">
            {isPreviewAvailable && (
              <button 
                onClick={togglePreview}
                className="absolute top-4 right-4 flex items-center space-x-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium"
              >
                <Eye size={16} />
                <span>{showPreview ? 'إغلاق المعاينة' : 'معاينة الهدية'}</span>
              </button>
            )}
            
            {showPreview ? (
              <GiftPreview giftCardData={giftCardData} onClose={togglePreview} />
            ) : showAIImageCustomizer ? (
              <AIImageCustomization onSelectImage={(image) => {
                updateGiftCardData({
                  personalization: {
                    ...giftCardData.personalization,
                    media: { type: 'image', preview: image }
                  }
                });
                toggleAIImageCustomizer();
              }} />
            ) : showEventReminder ? (
              <EventReminder />
            ) : (
              renderStep()
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GiftCard className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold">LikeGift</h3>
              </div>
              <p className="text-gray-400">جعل الهدايا شخصية وممتعة ولا تُنسى.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">بطاقات الهدايا</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">هدايا الشركات</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">كيف تعمل</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">الأسئلة الشائعة</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">قانوني</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">شروط الخدمة</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">سياسة الخصوصية</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">سياسة الاسترداد</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">اتصل بنا</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Mail size={16} className="text-gray-400" />
                  <a href="mailto:support@likegift.com" className="text-gray-400 hover:text-white">support@likegift.com</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone size={16} className="text-gray-400" />
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-white">+1 (234) 567-890</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 LikeGift. جميع الحقوق محفوظة.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg></a>
              <a href="#" className="text-gray-400 hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg></a>
              <a href="#" className="text-gray-400 hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;