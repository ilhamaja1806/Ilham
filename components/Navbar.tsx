import React, { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onNavigate: (section: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, wishlistCount, onOpenCart, onOpenWishlist, onNavigate, searchQuery, setSearchQuery }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartAnimate, setIsCartAnimate] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Trigger cart animation when count changes
  useEffect(() => {
    if (cartCount > 0) {
      setIsCartAnimate(true);
      const timer = setTimeout(() => setIsCartAnimate(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const toggleSearch = () => {
    if (isSearchOpen && searchQuery === '') {
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen(true);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('hero')}>
            <span className="text-3xl font-bold font-heading tracking-tighter text-stone-900">JTRIFT</span>
            <div className="ml-2 w-2 h-2 bg-orange-600 rounded-full"></div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button onClick={() => onNavigate('collection')} className="text-stone-600 hover:text-stone-900 font-medium transition-colors">Koleksi</button>
            <button onClick={() => onNavigate('about')} className="text-stone-600 hover:text-stone-900 font-medium transition-colors">Tentang Kami</button>
            <button onClick={() => onNavigate('contact')} className="text-stone-600 hover:text-stone-900 font-medium transition-colors">Kontak</button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-stone-100 rounded-full transition-all duration-300 px-3 py-1.5 group">
              <input 
                ref={searchInputRef}
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari jaket..."
                className={`bg-transparent outline-none text-sm transition-all duration-300 ${isSearchOpen ? 'w-32 md:w-48 ml-2' : 'w-0 overflow-hidden'}`}
                onBlur={() => { if (searchQuery === '') setIsSearchOpen(false); }}
              />
              <button 
                onClick={toggleSearch}
                className={`p-1 text-stone-600 hover:text-stone-900 transition-colors ${isSearchOpen && 'text-orange-600'}`}
              >
                <i className={`fa-solid ${isSearchOpen && searchQuery !== '' ? 'fa-xmark' : 'fa-magnifying-glass'} text-lg`}></i>
              </button>
            </div>

            <button 
              onClick={onOpenWishlist}
              className="relative p-2 text-stone-600 hover:text-orange-600 transition-colors"
              aria-label="Wishlist"
            >
              <i className="fa-regular fa-heart text-2xl"></i>
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-stone-900 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button 
              onClick={onOpenCart}
              className={`relative p-2 text-stone-600 hover:text-stone-900 transition-colors ${isCartAnimate ? 'animate-cart-pop' : ''}`}
              aria-label="Cart"
            >
              <i className="fa-solid fa-bag-shopping text-2xl"></i>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-orange-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;