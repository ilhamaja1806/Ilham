
import React from 'react';
import { Review } from '../types';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
  onToggleHelpful: (id: string) => void;
  votedReviews: Set<string>;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({ isOpen, onClose, reviews, onToggleHelpful, votedReviews }) => {
  if (!isOpen) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <i 
        key={i} 
        className={`fa-solid fa-star text-xs ${i < rating ? 'text-orange-600' : 'text-stone-200'}`}
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold font-heading text-stone-900">Ulasan Pelanggan</h2>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex text-orange-600">
                {renderStars(5)}
              </div>
              <span className="text-sm font-bold text-stone-500">4.9/5.0 (200+ ulasan)</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-900"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Reviews List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-stone-100 pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-stone-900">{review.userName}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest">{review.date}</span>
                  </div>
                </div>
                <div className="bg-stone-100 px-3 py-1 rounded-full">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-tight">Terverifikasi</span>
                </div>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                "{review.comment}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[10px] text-stone-400 bg-stone-50 p-2 rounded-lg inline-flex">
                  <i className="fa-solid fa-bag-shopping"></i>
                  <span className="font-medium">Membeli: {review.productName}</span>
                </div>
                
                <button 
                  onClick={() => onToggleHelpful(review.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    votedReviews.has(review.id)
                      ? 'bg-orange-600 text-white'
                      : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                  }`}
                >
                  <i className="fa-solid fa-thumbs-up text-[10px]"></i>
                  <span>{review.helpfulCount > 0 ? review.helpfulCount : ''} Membantu</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-stone-100 bg-stone-50 text-center">
          <p className="text-xs text-stone-400 italic">Terima kasih telah berkontribusi memberikan ulasan!</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
