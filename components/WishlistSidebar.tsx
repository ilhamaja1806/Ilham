import React, { useState } from 'react';
import { Product } from '../types';
import { FORMAT_CURRENCY } from '../constants';

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  productStocks: Record<string, number>;
  onRemove: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

const WishlistSidebar: React.FC<WishlistSidebarProps> = ({ isOpen, onClose, items, productStocks, onRemove, onMoveToCart }) => {
  const [removingId, setRemovingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRemoveWithAnimation = (product: Product) => {
    setRemovingId(product.id);
    // Wait for animation to finish before calling parent remove
    setTimeout(() => {
      onRemove(product);
      setRemovingId(null);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[120] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 transition-opacity backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col relative animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
                <i className="fa-solid fa-heart"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold font-heading text-stone-900">Wishlist</h2>
                <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">Favorit Kamu</p>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-all">
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-stone-50/50">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner">
                    <i className="fa-regular fa-heart text-5xl opacity-10"></i>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center border-4 border-white">
                    <i className="fa-solid fa-magnifying-glass text-orange-600 text-xs"></i>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-bold text-stone-900 text-lg">Wishlist Kamu Kosong</p>
                  <p className="text-xs mt-2 max-w-[240px] leading-relaxed text-stone-500">
                    Sepertinya kamu belum menemukan jaket yang cocok. Yuk cek koleksi terbaru kami!
                  </p>
                </div>
                <button 
                  onClick={onClose} 
                  className="px-10 py-4 bg-stone-900 text-white text-xs font-bold rounded-xl uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl active:scale-95"
                >
                  Mulai Belanja
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => {
                  const currentStock = productStocks[item.id] || 0;
                  const isOutOfStock = currentStock <= 0;
                  const isRemoving = removingId === item.id;

                  return (
                    <li 
                      key={item.id} 
                      className={`bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex space-x-4 transition-all hover:shadow-md animate-in fade-in slide-in-from-right-4 duration-300 
                        ${isOutOfStock ? 'opacity-60' : ''} 
                        ${isRemoving ? 'animate-exit-wishlist' : ''}`}
                    >
                      <div className="relative group shrink-0">
                        <img src={item.image} alt={item.name} className={`w-24 h-32 object-cover rounded-xl shadow-sm transition-all ${isOutOfStock ? 'grayscale' : 'group-hover:scale-105'}`} />
                        <button 
                          onClick={() => handleRemoveWithAnimation(item)}
                          className="absolute -top-2 -left-2 w-8 h-8 bg-white shadow-md border border-stone-100 rounded-full flex items-center justify-center text-stone-400 hover:text-red-500 hover:scale-110 transition-all z-10"
                          title="Hapus dari favorit"
                        >
                          <i className="fa-solid fa-xmark text-xs"></i>
                        </button>
                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                             <span className="bg-red-600 text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter shadow-lg">Sold Out</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={`font-bold text-sm leading-tight transition-colors ${isOutOfStock ? 'text-stone-400' : 'text-stone-900'}`}>{item.name}</h3>
                            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-widest font-black">{item.category}</p>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <span className={`font-bold text-sm ${isOutOfStock ? 'text-stone-400' : 'text-stone-900'}`}>{FORMAT_CURRENCY(item.price)}</span>
                          {currentStock < 10 && currentStock > 0 && (
                            <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100 animate-pulse">Sisa {currentStock}</span>
                          )}
                        </div>
                        
                        <div className="mt-auto">
                          <button 
                            onClick={() => onMoveToCart(item)}
                            disabled={isOutOfStock}
                            className={`w-full py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] rounded-lg transition-all flex items-center justify-center space-x-2 border ${
                              isOutOfStock 
                                ? 'bg-stone-50 text-stone-300 border-stone-100 cursor-not-allowed' 
                                : 'bg-stone-900 text-white border-stone-900 hover:bg-black shadow-lg shadow-stone-200 active:scale-95'
                            }`}
                          >
                            <i className={`fa-solid ${isOutOfStock ? 'fa-hourglass-end' : 'fa-cart-plus'} text-[10px]`}></i>
                            <span>{isOutOfStock ? 'Stok Habis' : 'Pilih Ukuran'}</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-100 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs text-stone-500 font-medium">Total Favorit</span>
                <span className="text-base font-bold text-stone-900">{items.length} Jaket</span>
              </div>
              <button 
                onClick={onClose}
                className="w-full py-4 border border-stone-200 text-stone-600 font-bold rounded-xl hover:bg-stone-50 hover:text-stone-900 transition-all text-xs uppercase tracking-[0.2em]"
              >
                Lanjut Belanja
              </button>
              <p className="mt-4 text-center text-[10px] text-stone-400 font-medium leading-relaxed italic">
                Simpan koleksi favoritmu di sini. Stok setiap batch sangat terbatas!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistSidebar;