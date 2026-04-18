import React, { useState } from 'react';
import { CartItem, PaymentMethod } from '../types';
import { FORMAT_CURRENCY } from '../constants';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  productStocks: Record<string, number>;
  onRemove: (id: string, size: string) => void;
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onCheckoutSuccess?: (items: CartItem[], total: number, payment: PaymentMethod) => void;
}

type CheckoutStep = 'cart' | 'payment' | 'confirm';

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, productStocks, onRemove, onUpdateQuantity, onCheckoutSuccess }) => {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  const handleClose = () => {
    setStep('cart');
    setSelectedPayment(null);
    onClose();
  };

  const handleRemoveWithAnimation = (id: string, size: string) => {
    setRemovingItemId(`${id}-${size}`);
    setTimeout(() => {
      onRemove(id, size);
      setRemovingItemId(null);
    }, 400);
  };

  const handleProcessCheckout = () => {
    if (onCheckoutSuccess && selectedPayment) {
      onCheckoutSuccess(items, total, selectedPayment);
    }
    setStep('cart');
    setSelectedPayment(null);
    onClose();
  };

  const paymentOptions: { id: PaymentMethod; label: string; icon: string; desc: string }[] = [
    { id: 'QRIS', label: 'QRIS (Gopay/OVO/Dana)', icon: 'fa-qrcode', desc: 'Scan instan, proses otomatis.' },
    { id: 'Bank Transfer', label: 'Virtual Account', icon: 'fa-building-columns', desc: 'BCA, Mandiri, BNI, BRI.' },
    { id: 'E-Wallet', label: 'E-Wallet Direct', icon: 'fa-wallet', desc: 'Pembayaran langsung via GoPay/ShopeePay.' },
  ];

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={handleClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col relative">
          <div className="p-6 border-b border-stone-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold font-heading">
                {step === 'cart' ? 'Keranjang Kamu' : step === 'payment' ? 'Pilih Pembayaran' : 'Konfirmasi Akhir'}
              </h2>
              <div className="flex space-x-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${
                    (step === 'cart' && i === 1) || 
                    (step === 'payment' && i <= 2) || 
                    (step === 'confirm' && i <= 3) 
                      ? 'bg-orange-600' : 'bg-stone-200'
                  }`} />
                ))}
              </div>
            </div>
            <button onClick={handleClose} className="text-stone-500 hover:text-stone-900">
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-400">
                <i className="fa-solid fa-bag-shopping text-6xl mb-4 opacity-20"></i>
                <p>Keranjang kamu masih kosong.</p>
                <button onClick={handleClose} className="mt-4 text-orange-600 font-semibold hover:underline">
                  Mulai Belanja
                </button>
              </div>
            ) : (
              <>
                {step === 'cart' && (
                  <ul className="space-y-6 animate-in fade-in duration-300">
                    {items.map((item) => {
                      const availableStock = productStocks[item.id] || 0;
                      const isRemoving = removingItemId === `${item.id}-${item.selectedSize}`;
                      return (
                        <li 
                          key={`${item.id}-${item.selectedSize}`} 
                          className={`flex space-x-4 transition-all ${isRemoving ? 'animate-exit-cart' : ''}`}
                        >
                          <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded shadow-sm" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-stone-900 text-sm leading-tight">{item.name}</h3>
                              <button 
                                onClick={() => handleRemoveWithAnimation(item.id, item.selectedSize)} 
                                className="text-stone-300 hover:text-red-500 transition-colors ml-2"
                              >
                                <i className="fa-solid fa-trash-can text-xs"></i>
                              </button>
                            </div>
                            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold mt-1">Ukuran: {item.selectedSize}</p>
                            
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                                <button 
                                  onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)} 
                                  className="px-2.5 py-1 hover:bg-stone-100 text-stone-500"
                                >
                                  <i className="fa-solid fa-minus text-[10px]"></i>
                                </button>
                                <span className="px-3 py-1 text-xs font-bold w-8 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)} 
                                  disabled={availableStock <= 0}
                                  className={`px-2.5 py-1 text-stone-500 ${availableStock <= 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-stone-100'}`}
                                >
                                  <i className="fa-solid fa-plus text-[10px]"></i>
                                </button>
                              </div>
                              <span className="font-bold text-sm">{FORMAT_CURRENCY(item.price * item.quantity)}</span>
                            </div>
                            {availableStock < 5 && availableStock > 0 && (
                               <p className="text-[10px] text-orange-600 font-bold mt-2 flex items-center">
                                 <i className="fa-solid fa-circle-exclamation mr-1"></i>
                                 Sisa {availableStock} pcs di stok
                               </p>
                            )}
                            {availableStock <= 0 && (
                               <p className="text-[10px] text-red-600 font-bold mt-2">Stok terakhir sudah di tanganmu!</p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {step === 'payment' && (
                  <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Metode Tersedia</p>
                    {paymentOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedPayment(opt.id)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center space-x-4 ${
                          selectedPayment === opt.id 
                            ? 'border-orange-600 bg-orange-50/30' 
                            : 'border-stone-100 hover:border-stone-200 bg-stone-50'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm ${
                          selectedPayment === opt.id ? 'bg-orange-600 text-white' : 'bg-white text-stone-400'
                        }`}>
                          <i className={`fa-solid ${opt.icon}`}></i>
                        </div>
                        <div>
                          <p className="font-bold text-sm text-stone-900">{opt.label}</p>
                          <p className="text-[10px] text-stone-500 mt-0.5">{opt.desc}</p>
                        </div>
                        {selectedPayment === opt.id && (
                          <div className="ml-auto text-orange-600">
                            <i className="fa-solid fa-circle-check"></i>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {step === 'confirm' && (
                  <div className="animate-in slide-in-from-right-4 duration-300">
                    <div className="bg-stone-900 text-white rounded-2xl p-6 mb-6">
                      <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-4">Detail Pesanan</h4>
                      <div className="space-y-3 mb-6">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs">
                            <span className="text-stone-400">{item.quantity}x {item.name} ({item.selectedSize})</span>
                            <span className="font-bold">{FORMAT_CURRENCY(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                        <span className="text-sm">Metode Bayar</span>
                        <span className="text-sm font-bold bg-orange-600/20 px-3 py-1 rounded-full text-orange-400">{selectedPayment}</span>
                      </div>
                    </div>
                    <div className="p-4 border-2 border-dashed border-stone-200 rounded-2xl">
                      <p className="text-xs text-stone-500 leading-relaxed text-center">
                        Pesananmu diproses secara real-time. Stok dikunci selama sesi pembayaran ini.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="p-6 border-t border-stone-200 bg-stone-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-stone-600 font-medium">Total Tagihan</span>
              <span className="text-xl font-bold text-stone-900">{FORMAT_CURRENCY(total)}</span>
            </div>

            {step === 'cart' && (
              <button 
                onClick={() => setStep('payment')}
                disabled={items.length === 0}
                className="w-full py-4 bg-stone-900 text-white font-bold rounded-xl hover:bg-black transition-all disabled:bg-stone-200 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-stone-200"
              >
                <span>Checkout Sekarang</span>
                <i className="fa-solid fa-arrow-right text-xs opacity-50"></i>
              </button>
            )}

            {step === 'payment' && (
              <div className="flex space-x-3">
                <button 
                  onClick={() => setStep('cart')}
                  className="flex-1 py-4 border border-stone-300 text-stone-600 font-bold rounded-xl hover:bg-white transition-colors"
                >
                  Kembali
                </button>
                <button 
                  onClick={() => setStep('confirm')}
                  disabled={!selectedPayment}
                  className="flex-1 py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  Lanjut
                </button>
              </div>
            )}

            {step === 'confirm' && (
              <div className="flex space-x-3">
                <button 
                  onClick={() => setStep('payment')}
                  className="px-6 py-4 border border-stone-300 text-stone-600 font-bold rounded-xl hover:bg-white transition-colors"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button 
                  onClick={handleProcessCheckout}
                  className="flex-1 py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 shadow-xl shadow-orange-600/30 transition-all active:scale-95"
                >
                  Bayar & Selesaikan
                </button>
              </div>
            )}

            <p className="mt-4 text-center text-[10px] text-stone-400 uppercase tracking-widest font-bold">
              Secure Checkout • 256-bit SSL Encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;