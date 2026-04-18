
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import WishlistSidebar from './components/WishlistSidebar';
import AIStylist from './components/AIStylist';
import CustomerReviews from './components/CustomerReviews';
import OrderTracking from './components/OrderTracking';
import TermsAndConditionsModal from './components/TermsAndConditionsModal';
import ContactSection from './components/ContactSection';
import AboutSection from './components/AboutSection';
import SplashScreen from './components/SplashScreen';
import { PRODUCTS } from './constants';
import { Product, CartItem, Category, Order, PaymentMethod } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [footerEmail, setFooterEmail] = useState('');
  
  const [productStocks, setProductStocks] = useState<Record<string, number>>(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: p.stock }), {})
  );

  const heroRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product, size: string) => {
    const currentStock = productStocks[product.id];
    if (currentStock <= 0) {
      showToast('Maaf, stok produk ini sudah habis!', 'error');
      return;
    }
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1 }];
    });
    setProductStocks(prev => ({ ...prev, [product.id]: prev[product.id] - 1 }));
    setIsCartOpen(true);
    showToast(`${product.name} ditambahkan ke keranjang!`);
  };

  const toggleWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        showToast(`${product.name} dihapus dari favorit`, 'info');
        return prev.filter(item => item.id !== product.id);
      }
      showToast(`${product.name} masuk ke wishlist!`);
      return [...prev, product];
    });
  };

  const handleMoveToCart = (product: Product) => {
    setIsWishlistOpen(false);
    if (activeCategory !== 'All' && product.category !== activeCategory) {
      setActiveCategory('All');
    }
    setTimeout(() => {
      const element = document.getElementById(`product-${product.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-4', 'ring-orange-500/30', 'rounded-2xl', 'duration-500');
        setTimeout(() => element.classList.remove('ring-4', 'ring-orange-500/30'), 2000);
      }
    }, 100);
  };

  const removeFromCart = (id: string, size: string) => {
    const itemToRemove = cartItems.find(item => item.id === id && item.selectedSize === size);
    if (itemToRemove) {
      setProductStocks(prev => ({ ...prev, [id]: prev[id] + itemToRemove.quantity }));
    }
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    const currentStock = productStocks[id];
    if (delta > 0 && currentStock <= 0) {
      showToast('Stok tidak mencukupi!', 'error');
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
    setProductStocks(prev => ({ ...prev, [id]: prev[id] - delta }));
  };

  const handleCheckoutSuccess = (items: CartItem[], total: number, payment: PaymentMethod) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      receiptNumber: `JTR-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...items],
      total: total,
      date: new Date().toLocaleDateString('id-ID'),
      status: 'In Transit',
      paymentMethod: payment,
      trackingHistory: [
        { status: 'Pesanan Dibuat', location: 'Sistem JTRIFT', time: '10:00', isCompleted: true },
        { status: 'Pembayaran Diterima', location: payment, time: '10:05', isCompleted: true },
        { status: 'Telah Dikemas', location: 'Gudang Bekasi', time: '14:20', isCompleted: true },
        { status: 'Dalam Perjalanan', location: 'Sorting Hub Bekasi', time: '16:45', isCompleted: true },
        { status: 'Sampai di Tujuan', location: 'Alamat Penerima', time: '--:--', isCompleted: false },
      ]
    };
    setOrders(prev => [...prev, newOrder]);
    setCartItems([]);
    setIsTrackingOpen(true);
    showToast('Pemesanan berhasil! Paket segera dikirim.');
  };

  const scrollToSection = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      hero: heroRef,
      collection: collectionRef,
      about: aboutRef,
      contact: contactRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJoinCommunity = (email: string) => {
    if (!email || !email.includes('@')) {
      showToast('Harap masukkan email yang valid!', 'error');
      return;
    }
    
    showToast(`Berhasil! Mengalihkan Anda ke WhatsApp Channel JTRIFT...`, 'success');
    
    // Redirect ke WhatsApp channel setelah delay singkat
    setTimeout(() => {
      window.open('https://whatsapp.com/channel/0029Vb8CUSpFi8xegtp7901C', '_blank');
    }, 1200);
  };

  const categories: [Category, string][] = [
    ['All', 'Semua'], ['Varsity', 'Varsity'], ['Bomber', 'Bomber'], 
    ['Sukajan', 'Sukajan'], ['Denim', 'Denim'], ['Windbreaker', 'Windbreaker'], 
    ['Puffer', 'Puffer'], ['Parka', 'Parka'], ['Vintage', 'Vintage'],
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading && <SplashScreen onComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <div className="cubic-bezier animate-in fade-in duration-1000">
          {toast && (
            <div className="fixed top-24 right-6 z-[200] animate-in slide-in-from-right-10 fade-in duration-300">
              <div className={`px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border ${
                toast.type === 'success' ? 'bg-stone-900 border-stone-800 text-white' : 
                toast.type === 'error' ? 'bg-red-600 border-red-500 text-white' : 'bg-white border-stone-200 text-stone-900'
              }`}>
                <i className={`fa-solid ${
                  toast.type === 'success' ? 'fa-circle-check text-orange-500' : 
                  toast.type === 'error' ? 'fa-triangle-exclamation text-white' : 'fa-heart text-stone-400'
                }`}></i>
                <span className="text-sm font-bold tracking-tight">{toast.message}</span>
              </div>
            </div>
          )}

          <Navbar 
            cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)} 
            wishlistCount={wishlistItems.length}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onNavigate={scrollToSection}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <main className="flex-grow">
            <section ref={heroRef} className="relative h-[85vh] flex items-center overflow-hidden bg-stone-900">
              <div className="absolute inset-0 opacity-60 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1920" 
                  style={{ transform: `translateY(${scrollY * 0.4}px) scale(1.15)`, transition: 'transform 0.1s linear' }}
                  className="w-full h-full object-cover origin-center" alt="Hero" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/40 to-transparent"></div>
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tighter leading-none mb-6 animate-in slide-in-from-left duration-1000">
                  DEFINISI KARYA<br /><span className="text-orange-600 italic">ANAK BANGSA.</span>
                </h1>
                <p className="max-w-xl text-lg md:text-xl text-stone-300 mb-10 font-light leading-relaxed animate-in slide-in-from-left delay-150 duration-1000">
                  Jaket lokal premium yang memadukan estetika vintage dengan siluet street modern. Dibuat di Indonesia, dirancang untuk dunia.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-in slide-in-from-bottom-10 delay-300 duration-1000">
                  <button onClick={() => scrollToSection('collection')} className="px-8 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-600/20">Belanja Sekarang</button>
                  <button onClick={() => scrollToSection('about')} className="px-8 py-4 border border-white/30 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white hover:text-stone-900 transition-all">Cerita Kami</button>
                </div>
              </div>
            </section>

            <section ref={collectionRef} className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
                  <div>
                    <h2 className="text-4xl font-bold font-heading text-stone-900 tracking-tight">{searchQuery ? `Hasil untuk "${searchQuery}"` : 'Koleksi Saat Ini'}</h2>
                    <p className="mt-2 text-stone-500">{searchQuery ? `${filteredProducts.length} produk ditemukan` : 'Batch terbatas, detail maksimal di setiap jahitan.'}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:max-w-xl justify-end">
                    {categories.map(([cat, label]) => (
                      <button key={cat} onClick={() => {setActiveCategory(cat); collectionRef.current?.scrollIntoView({ behavior: 'smooth' });}} className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-stone-900 text-white shadow-lg' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}>{label}</button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} currentStock={productStocks[product.id]} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={wishlistItems.some(item => item.id === product.id)} searchQuery={searchQuery} />
                  ))}
                </div>
              </div>
            </section>

            <div ref={aboutRef}>
              <AboutSection onJoin={handleJoinCommunity} scrollY={scrollY} />
            </div>

            <section className="py-16 bg-stone-100 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-12 md:space-y-0 md:space-x-12">
                <div className="md:w-1/2 relative group">
                  <img src="https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&q=80&w=800" className="rounded-3xl shadow-2xl transition-transform group-hover:scale-[1.02] duration-500" alt="Produksi" />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-12">
                    <div className="text-center"><span className="block text-4xl font-bold">100%</span><span className="text-[10px] font-bold uppercase tracking-widest">Buatan Lokal</span></div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-4xl font-bold font-heading text-stone-900 leading-tight mb-6">Kualitas adalah satu-satunya obsesi kami.</h2>
                  <p className="text-stone-600 text-lg mb-8">Setiap bagian JTRIFT melalui proses kurasi yang ketat. Kami hanya menggunakan kain berat premium, ritsleting YKK, dan teknik bordir exclusif untuk memastikan jaket Anda bertahan selama beberapa dekade.</p>
                  <ul className="space-y-4">
                    {['Detail denim hand-distressed', 'Bahan berat 320gsm premium', 'Produksi terbatas (Maks 50 per gaya)', 'Jahitan yang diperkuat untuk ketahanan'].map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-stone-700"><i className="fa-solid fa-check text-orange-600"></i><span className="font-medium">{item}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <CustomerReviews />
            <div ref={contactRef}>
              <ContactSection onSendMessage={(msg) => showToast(msg, 'success')} />
            </div>

            <section className="bg-stone-950 text-white py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                  <span className="text-4xl font-black font-heading tracking-tighter mb-6 block">JTRIFT</span>
                  <p className="text-stone-400 max-w-sm mb-8">Est. 2021. Lahir di Bekasi, menetapkan standar baru untuk street heritage Indonesia. Mengkurasi getaran, menjahit cerita.</p>
                  <div className="flex space-x-6">
                    <a href="https://www.instagram.com/18_hamm?igsh=MXU1amVzdjZkczhxbA==" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-orange-600 transition-colors"><i className="fa-brands fa-instagram"></i></a>
                    <a href="https://www.tiktok.com/@chxx_ham?_r=1&_t=ZS-93cADtjlHCZ" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-orange-600 transition-colors"><i className="fa-brands fa-tiktok"></i></a>
                    <a href="https://wa.me/6282113823424" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-orange-600 transition-colors"><i className="fa-brands fa-whatsapp"></i></a>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-stone-500">Tautan Cepat</h4>
                  <ul className="space-y-4 text-stone-300">
                    <li><button onClick={() => scrollToSection('collection')} className="hover:text-white transition-colors">Belanja Semua</button></li>
                    <li><button onClick={() => setIsTrackingOpen(true)} className="hover:text-white transition-colors">Lacak Pesanan</button></li>
                    <li><button className="hover:text-white transition-colors">Panduan Ukuran</button></li>
                    <li><button onClick={() => setIsTermsOpen(true)} className="hover:text-white transition-colors">Syarat & Ketentuan</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-stone-500">Buletin</h4>
                  <p className="text-stone-400 text-sm mb-4">Dapatkan akses awal untuk drop produk & diskon.</p>
                  <div className="flex">
                    <input type="email" value={footerEmail} onChange={(e) => setFooterEmail(e.target.value)} placeholder="email@kamu.com" className="bg-stone-900 border-stone-800 rounded-l-lg px-4 py-2 flex-1 focus:ring-0 outline-none text-white" />
                    <button onClick={() => handleJoinCommunity(footerEmail)} className="bg-orange-600 px-4 py-2 rounded-r-lg font-bold hover:bg-orange-700 transition-colors">Gabung</button>
                  </div>
                </div>
              </div>
              <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-stone-900 text-center text-stone-500 text-sm">&copy; {new Date().getFullYear()} JTRIFT Street Heritage.</div>
            </section>
          </main>

          <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} productStocks={productStocks} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} onCheckoutSuccess={handleCheckoutSuccess} />
          <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} items={wishlistItems} productStocks={productStocks} onRemove={toggleWishlist} onMoveToCart={handleMoveToCart} />
          <OrderTracking isOpen={isTrackingOpen} onClose={() => setIsTrackingOpen(false)} orders={orders} />
          <TermsAndConditionsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
          <AIStylist />
        </div>
      )}
    </div>
  );
};

export default App;
