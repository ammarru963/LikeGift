<div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-3">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-medium text-orange-500">{(giftData.cardValue + 5 + giftData.cardValue * 0.15).toFixed(2)} SAR</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Delivery Status</span>
              <span className="font-medium text-green-500">
                {giftData.delivery.scheduled ? 'Scheduled' : 'Processing'}
              </span>
            </div>
            
            {giftData.delivery.scheduled && (
              <div className="mt-3 text-sm text-gray-500">
                Will be delivered on {giftData.delivery.scheduledDate}
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <button className="px-6 py-3 rounded-lg font-medium bg-orange-500 hover:bg-orange-600 text-white flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              View Receipt
            </button>
            
            <button className="px-6 py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Send Another Gift
            </button>
            
            <a href="#" className="text-orange-500 hover:text-orange-600 flex items-center">
              <ArrowRight className="w-4 h-4 mr-1" />
              Return to Home
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Preview;