
import React from 'react';
import { Order, OrderTrackPoint } from '../types';
import { FORMAT_CURRENCY } from '../constants';

interface OrderTrackingProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ isOpen, onClose, orders }) => {
  if (!isOpen) return null;

  const currentOrder = orders[orders.length - 1]; // Track the latest order for simplicity in this demo

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold font-heading text-stone-900">Lacak Pesanan</h2>
            <p className="text-xs text-stone-500 mt-1 uppercase tracking-widest font-medium">Real-time Delivery Tracking</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors">
            <i className="fa-solid fa-xmark text-xl text-stone-400"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
          {!currentOrder ? (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-truck-fast text-3xl text-stone-300"></i>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Belum Ada Pesanan Aktif</h3>
              <p className="text-stone-500 max-w-xs mx-auto text-sm leading-relaxed">
                Kamu belum melakukan transaksi. Silakan pilih jaket favoritmu dan lakukan checkout untuk melihat fitur ini.
              </p>
            </div>
          ) : (
            <>
              {/* Order Info Card */}
              <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <i className="fa-solid fa-box-open text-6xl rotate-12"></i>
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-orange-400 font-bold">Nomor Resi</span>
                      <h3 className="text-xl font-mono font-bold">{currentOrder.receiptNumber}</h3>
                    </div>
                    <div className="flex flex-col items-end">
                       <div className="bg-orange-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-2">
                         {currentOrder.status === 'In Transit' ? 'Dalam Perjalanan' : currentOrder.status}
                       </div>
                       <span className="text-[8px] uppercase tracking-widest text-stone-500 font-bold">Via {currentOrder.paymentMethod}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest">Estimasi Tiba</p>
                      <p className="font-bold text-sm">Besok, 18:00 WIB</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest">Kurir</p>
                      <p className="font-bold text-sm">JTRIFT Express (J-09)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Timeline */}
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-[19px] before:w-0.5 before:bg-stone-100 before:z-0">
                {currentOrder.trackingHistory.map((point, idx) => (
                  <div key={idx} className="relative flex items-start space-x-6 z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                      point.isCompleted ? 'bg-orange-600 text-white ring-4 ring-orange-50' : 'bg-stone-200 text-stone-400'
                    }`}>
                      <i className={`fa-solid ${
                        idx === 0 ? 'fa-check' : 
                        idx === 1 ? 'fa-credit-card' : 
                        idx === 2 ? 'fa-box' : 
                        idx === 3 ? 'fa-truck' : 'fa-house-chimney'
                      } text-sm`}></i>
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-bold text-sm ${point.isCompleted ? 'text-stone-900' : 'text-stone-400'}`}>
                          {point.status}
                        </h4>
                        <span className="text-[10px] text-stone-400 font-medium">— {point.time}</span>
                      </div>
                      <p className={`text-xs mt-1 ${point.isCompleted ? 'text-stone-500' : 'text-stone-300'}`}>
                        {point.location ? `Detail: ${point.location}` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Item Summary */}
              <div className="bg-stone-50 rounded-2xl p-6">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Ringkasan Barang</h4>
                <div className="space-y-4">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-stone-900">{item.name}</p>
                        <p className="text-[10px] text-stone-500">Qty: {item.quantity} • Size: {item.selectedSize}</p>
                      </div>
                      <p className="text-xs font-bold text-stone-900">{FORMAT_CURRENCY(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="p-6 border-t border-stone-100 bg-stone-50 flex justify-center">
           <p className="text-[10px] text-stone-400 uppercase tracking-[0.3em] font-black">JTRIFT LOGISTICS SYSTEM</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
