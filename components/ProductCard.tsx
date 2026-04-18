
import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { FORMAT_CURRENCY } from '../constants';

interface ProductCardProps {
  product: Product;
  currentStock: number;
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  searchQuery?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  currentStock, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted,
  searchQuery = ''
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);
  const [isSquishing, setIsSquishing] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const isOutOfStock = currentStock <= 0;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPulsing(true);
    onToggleWishlist(product);
    setTimeout(() => setIsPulsing(false), 400);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => (
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-orange-600 font-black">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        ))}
      </>
    );
  };

  const triggerFlyAnimation = () => {
    if (!imageRef.current) return;

    const imgRect = imageRef.current.getBoundingClientRect();
    const cartEl = document.querySelector('[aria-label="Cart"]');
    if (!cartEl) return;
    const cartRect = cartEl.getBoundingClientRect();

    const flyer = document.createElement('img');
    flyer.src = product.image;
    flyer.className = 'product-flyer';
    flyer.style.left = `${imgRect.left}px`;
    flyer.style.top = `${imgRect.top}px`;
    flyer.style.width = `${imgRect.width}px`;
    flyer.style.height = `${imgRect.height}px`;
    flyer.style.borderRadius = '24px';
    
    document.body.appendChild(flyer);

    requestAnimationFrame(() => {
      flyer.style.left = `${cartRect.left + cartRect.width / 2 - 30}px`;
      flyer.style.top = `${cartRect.top + cartRect.height / 2 - 30}px`;
      flyer.style.width = '20px';
      flyer.style.height = '20px';
      flyer.style.opacity = '0';
      flyer.style.transform = 'rotate(720deg)';
    });

    setTimeout(() => {
      document.body.removeChild(flyer);
    }, 800);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Pilih ukuran dulu ya, Bro!');
      return;
    }

    setIsAdding(true);
    
    setTimeout(() => {
      triggerFlyAnimation();
      onAddToCart(product, selectedSize);
      setIsAdding(false);
      setIsAddedSuccess(true);
      setSelectedSize('');
      
      setTimeout(() => setIsAddedSuccess(false), 2000);
    }, 600);
  };

  const handleCardMouseDown = () => {
    if (!isOutOfStock) setIsSquishing(true);
  };

  const handleCardMouseUp = () => {
    setIsSquishing(false);
  };

  return (
    <div 
      ref={cardRef}
      id={`product-${product.id}`}
      onMouseDown={handleCardMouseDown}
      onMouseUp={handleCardMouseUp}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsSquishing(false);
      }}
      className={`group relative animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both squish-effect ${isSquishing ? 'squish-active' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
    >
      <div className={`aspect-[3/4] overflow-hidden rounded-2xl bg-stone-100 relative ${isOutOfStock ? 'grayscale' : ''} shadow-md group-hover:shadow-2xl group-hover:shadow-stone-200/50 transition-all duration-500 transform group-hover:-translate-y-1`}>
        {/* Product Image */}
        <img 
          ref={imageRef}
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        
        {/* Badge Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
          {product.isNew && !isOutOfStock && (
            <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
              Batch Baru
            </span>
          )}
          {currentStock > 0 && currentStock < 5 && (
            <span className="bg-stone-900 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg animate-pulse">
              Limit Terakhir
            </span>
          )}
        </div>

        {/* Favorite Trigger (Corner Icon) */}
        <button 
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-20 hover:scale-110 active:scale-90 ${
            isWishlisted 
              ? 'bg-orange-600 text-white' 
              : 'bg-white/90 backdrop-blur-md text-stone-400 hover:text-orange-600'
          } ${isPulsing ? 'animate-heartbeat' : ''}`}
        >
          <i className={`${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart text-lg`}></i>
        </button>
        
        {/* Action Overlay */}
        {!isOutOfStock && (
          <div className={`absolute inset-0 bg-stone-900/10 backdrop-blur-[2px] transition-all duration-300 flex flex-col justify-end p-5 z-20 ${isHovered || isAdding || isAddedSuccess ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div 
              className={`bg-white rounded-2xl p-5 shadow-2xl transform transition-all duration-300 ${isHovered || isAdding || isAddedSuccess ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {!isAddedSuccess ? (
                <>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Pilih Size</p>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Ready Stock</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-9 h-9 rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-all ${
                          selectedSize === size 
                            ? 'bg-stone-900 text-white border-stone-900 shadow-md' 
                            : 'border-stone-100 text-stone-600 hover:border-stone-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddToCart}
                      disabled={isAdding}
                      className="flex-1 bg-orange-600 text-white py-3.5 rounded-xl font-bold hover:bg-orange-700 transition-all flex items-center justify-center space-x-2 shadow-xl shadow-orange-600/20 active:scale-[0.97]"
                    >
                      {isAdding ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <i className="fa-solid fa-cart-plus text-xs"></i>
                          <span className="text-sm">Beli</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={handleFavoriteClick}
                      className={`w-14 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                        isWishlisted 
                          ? 'bg-stone-900 border-stone-900 text-orange-500 shadow-lg' 
                          : 'bg-stone-50 border-stone-100 text-stone-400 hover:bg-white hover:border-orange-200 hover:text-orange-600'
                      } ${isPulsing ? 'animate-heartbeat' : ''}`}
                      title={isWishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"}
                    >
                      <i className={`${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart text-base`}></i>
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-6 flex flex-col items-center justify-center space-y-3 animate-bounce-in">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner">
                    <i className="fa-solid fa-check text-xl"></i>
                  </div>
                  <p className="text-sm font-bold text-stone-900 uppercase tracking-widest">Berhasil Masuk!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-20">
            <div className="bg-white/20 border border-white/30 backdrop-blur-md px-5 py-2.5 rounded-full">
              <span className="text-white font-bold uppercase tracking-[0.2em] text-[10px]">Habis Terjual</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Product Details */}
      <div className="mt-5 flex justify-between items-start px-1">
        <div>
          <h3 className={`text-base font-bold font-heading transition-colors duration-300 ${isOutOfStock ? 'text-stone-400' : 'text-stone-900 group-hover:text-orange-600'}`}>
            {highlightText(product.name, searchQuery)}
          </h3>
          <p className="mt-1 text-[10px] text-stone-400 uppercase tracking-[0.15em] font-black">
            {highlightText(product.category, searchQuery)} Series
          </p>
        </div>
        <div className="text-right">
          <p className={`text-base font-bold ${isOutOfStock ? 'text-stone-400' : 'text-stone-900'}`}>
            {FORMAT_CURRENCY(product.price)}
          </p>
          <div className="flex items-center justify-end space-x-1 mt-1">
             <i className="fa-solid fa-star text-[8px] text-orange-500"></i>
             <span className="text-[10px] text-stone-400 font-bold">4.9</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
