
import React, { useState, useRef, useEffect } from 'react';
import { getStylistResponse } from '../services/geminiService';
import { Message, Product } from '../types';
import { PRODUCTS, FORMAT_CURRENCY } from '../constants';

const AIStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Halo! Saya Stylist Pribadi JTRIFT. Lagi cari jaket yang fresh hari ini? Kasih tahu saya apa yang kamu butuhkan!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const result = await getStylistResponse(userMessage, messages.map(m => ({ role: m.role, text: m.text })));
    setMessages(prev => [...prev, { 
      role: 'model', 
      text: result.text, 
      productIds: result.productIds 
    }]);
    setIsLoading(false);
  };

  const scrollToProduct = (id: string) => {
    const element = document.getElementById(`product-${id}`);
    if (element) {
      setIsOpen(false);
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-4', 'ring-orange-500/30', 'rounded-2xl', 'duration-1000');
      setTimeout(() => element.classList.remove('ring-4', 'ring-orange-500/30'), 3000);
    }
  };

  const CompactProductCard: React.FC<{ productId: string }> = ({ productId }) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return null;

    return (
      <div className="bg-white rounded-xl border border-stone-100 p-2 flex items-center space-x-3 hover:shadow-md transition-shadow group animate-in slide-in-from-left-2 duration-300">
        <img src={product.image} alt={product.name} className="w-12 h-14 object-cover rounded-lg flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-stone-900 truncate mb-0.5">{product.name}</p>
          <p className="text-[9px] text-orange-600 font-bold">{FORMAT_CURRENCY(product.price)}</p>
          <button 
            onClick={() => scrollToProduct(product.id)}
            className="mt-1 text-[8px] uppercase tracking-widest font-black text-stone-400 group-hover:text-stone-900 transition-colors flex items-center"
          >
            Lihat Detail <i className="fa-solid fa-arrow-right ml-1"></i>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col border border-stone-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-stone-900 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center">
                <i className="fa-solid fa-sparkles"></i>
              </div>
              <div>
                <h3 className="font-bold text-sm">JTRIFT AI Stylist</h3>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] uppercase tracking-widest opacity-70">Saran Cerdas Aktif</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-stone-400">
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-stone-50"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-orange-600 text-white rounded-br-none' 
                    : 'bg-white border border-stone-200 text-stone-800 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
                
                {msg.productIds && msg.productIds.length > 0 && (
                  <div className="mt-3 w-full max-w-[85%] space-y-2">
                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest ml-1">Rekomendasi Jaket:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.productIds.map(pid => (
                        <CompactProductCard key={pid} productId={pid} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-200 p-3 rounded-2xl shadow-sm rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-stone-200">
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanya rekomendasi ukuran atau gaya..."
                className="flex-1 bg-stone-100 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-stone-900 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-black transition-colors disabled:opacity-50"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-stone-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all group overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {isOpen ? (
          <i className="fa-solid fa-xmark text-2xl"></i>
        ) : (
          <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
        )}
      </button>
    </div>
  );
};

export default AIStylist;
