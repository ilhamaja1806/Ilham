import React from 'react';

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sections = [
    {
      title: "1.0 Ketentuan Umum",
      content: "Dengan mengakses dan melakukan pemesanan di JTRIFT, Anda dianggap telah membaca, memahami, dan menyetüju seluruh syarat dan ketentuan yang berlaku. JTRIFT berhak mengubah ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya."
    },
    {
      title: "2.0 Produk & Stok",
      content: "Produk JTRIFT diproduksi dalam jumlah terbatas (Limited Batch). Kami berusaha menampilkan warna produk seakurat mungkin, namun perbedaan warna dapat terjadi karena pengaturan layar perangkat Anda. Stok barang tidak dipesan sebelum pembayaran dikonfirmasi."
    },
    {
      title: "3.0 Pemesanan & Pembayaran",
      content: "Semua pesanan diproses setelah konfirmasi pembayaran diterima. Pelanggan wajib memberikan data pengiriman yang akurat. JTRIFT tidak bertanggung jawab atas keterlambatan atau kegagalan pengiriman akibat data yang tidak lengkap."
    },
    {
      title: "4.0 Kebijakan Pengiriman",
      content: "Pengiriman dilakukan dari gudang pusat kami di Bekasi. Estimasi waktu pengiriman bergantung pada lokasi tujuan dan kinerja kurir pihak ketiga. Nomor resi akan diinformasikan maksimal 1x24 jam setelah keberangkatan paket."
    },
    {
      title: "5.0 Pengembalian & Penukaran (Retur)",
      content: "Penukaran hanya berlaku untuk produk yang cacat produksi atau salah kirim. Pelanggan wajib menyertakan video unboxing tanpa jeda sebagai bukti utama. Batas maksimal pelaporan adalah 2x24 jam setelah paket diterima."
    },
    {
      title: "6.0 Hak Kekayaan Intelektual",
      content: "Seluruh desain, logo, foto, dan konten dalam website ini adalah milik eksklusif JTRIFT. Dilarang keras menyalin atau menggunakan aset visual kami untuk kepentingan komersial tanpa izin tertulis."
    }
  ];

  return (
    <div className="fixed inset-0 z-[170] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold font-heading text-stone-900">Syarat & Ketentuan</h2>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-widest font-black">Pembaruan Terakhir: Januari 2024</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors">
            <i className="fa-solid fa-xmark text-xl text-stone-400"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
          <div className="prose prose-stone">
            <p className="text-stone-500 text-sm leading-relaxed mb-8 italic">
              Selamat datang di komunitas JTRIFT. Mohon baca kebijakan ini dengan seksama untuk kenyamanan berbelanja Anda.
            </p>
            
            <div className="space-y-10">
              {sections.map((section, idx) => (
                <div key={idx} className="group">
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-3 flex items-center">
                    <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-3"></span>
                    {section.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed pl-4.5 border-l-2 border-stone-100 group-hover:border-orange-200 transition-colors">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-stone-50 rounded-2xl p-6 border border-stone-100">
            <h4 className="text-xs font-bold text-stone-900 mb-2">Butuh Bantuan Lebih Lanjut?</h4>
            <p className="text-xs text-stone-500 leading-relaxed mb-4">
              Jika ada poin yang kurang jelas, jangan ragu untuk menghubungi tim bantuan kami melalui kanal resmi yang tersedia.
            </p>
            <a 
              href="https://wa.me/6282113823424" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
            >
              <i className="fa-brands fa-whatsapp text-sm"></i>
              <span>Hubungi Customer Service</span>
            </a>
          </div>
        </div>

        <div className="p-6 border-t border-stone-100 bg-stone-50 flex justify-between items-center">
           <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">JTRIFT Legal Department</p>
           <button 
             onClick={onClose}
             className="px-6 py-2 bg-stone-900 text-white text-[10px] font-bold uppercase rounded-full hover:bg-black transition-all"
           >
             Saya Mengerti
           </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;