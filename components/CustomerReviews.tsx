
import React, { useState } from 'react';
import { REVIEWS } from '../constants';
import ReviewsModal from './ReviewsModal';

const CustomerReviews: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [votedReviews, setVotedReviews] = useState<Set<string>>(new Set());
  const [localReviews, setLocalReviews] = useState(REVIEWS);

  const toggleHelpful = (id: string) => {
    const newVoted = new Set(votedReviews);
    const isVoted = newVoted.has(id);
    
    if (isVoted) {
      newVoted.delete(id);
    } else {
      newVoted.add(id);
    }
    
    setLocalReviews(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, helpfulCount: isVoted ? r.helpfulCount - 1 : r.helpfulCount + 1 };
      }
      return r;
    }));
    setVotedReviews(newVoted);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <i 
        key={i} 
        className={`fa-solid fa-star text-xs ${i < rating ? 'text-orange-600' : 'text-stone-200'}`}
      />
    ));
  };

  return (
    <section className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-stone-100 px-4 py-2 rounded-full mb-6">
            <div className="flex -space-x-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-stone-300 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                </div>
              ))}
            </div>
            <span className="text-sm font-bold text-stone-900">4.9/5.0 Dari 200+ Pembeli</span>
          </div>
          <h2 className="text-4xl font-bold font-heading text-stone-900 tracking-tight">Apa Kata Mereka?</h2>
          <p className="mt-4 text-stone-500 max-w-2xl mx-auto">Kepuasan pelanggan adalah standar kualitas kami. Lihat ulasan jujur dari komunitas JTRIFT.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {localReviews.slice(0, 4).map((review) => (
            <div 
              key={review.id} 
              className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group/card"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
              </div>
              
              <p className="text-stone-700 text-sm italic mb-6 leading-relaxed flex-grow">
                "{review.comment}"
              </p>
              
              <div className="mt-auto border-t border-stone-200 pt-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold text-stone-900 text-sm">{review.userName}</p>
                    <p className="text-stone-400 text-[10px] uppercase tracking-widest mt-1">
                      {review.date}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => toggleHelpful(review.id)}
                    className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                      votedReviews.has(review.id)
                        ? 'bg-orange-600 text-white'
                        : 'bg-white text-stone-400 hover:text-stone-900 border border-stone-200'
                    }`}
                  >
                    <i className="fa-solid fa-thumbs-up"></i>
                    <span>{review.helpfulCount > 0 ? review.helpfulCount : ''} Bermanfaat</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-stone-900 font-bold border-b-2 border-orange-600 pb-1 hover:text-orange-600 transition-colors uppercase tracking-widest text-xs outline-none"
          >
            Lihat Semua Ulasan <i className="fa-solid fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>

      <ReviewsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        reviews={localReviews} 
        onToggleHelpful={toggleHelpful}
        votedReviews={votedReviews}
      />
    </section>
  );
};

export default CustomerReviews;
