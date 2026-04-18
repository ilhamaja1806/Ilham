import React, { useState } from 'react';

interface ContactSectionProps {
  onSendMessage: (msg: string) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onSendMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Inquiry Produk',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSendMessage(`Pesan terkirim! Terima kasih ${formData.name}, tim JTRIFT akan segera membalas.`);
      setFormData({ name: '', email: '', subject: 'Inquiry Produk', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfos = [
    { icon: 'fa-brands fa-whatsapp', label: 'WhatsApp', value: '+62 821-1382-3424', link: 'https://wa.me/6282113823424' },
    { icon: 'fa-solid fa-envelope', label: 'Email', value: 'jtriftstore@gmail.com', link: 'mailto:jtriftstore@gmail.com' },
    { icon: 'fa-solid fa-location-dot', label: 'Showroom', value: 'Bekasi Urban Warehouse, Jawa Barat', link: '#' },
  ];

  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Brand Info & Details */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-stone-900 tracking-tight mb-6">
              HUBUNGI <span className="text-orange-600">KAMI.</span>
            </h2>
            <p className="text-stone-600 text-lg mb-10 max-w-md leading-relaxed">
              Ada pertanyaan tentang koleksi kami atau butuh bantuan dengan pesanan? Tim kami siap membantu Anda 24/7.
            </p>

            <div className="space-y-8 mb-12">
              {contactInfos.map((info, idx) => (
                <a 
                  key={idx} 
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start group"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                    <i className={`${info.icon} text-xl`}></i>
                  </div>
                  <div className="ml-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1 flex items-center">
                      {info.label}
                      {info.label === 'WhatsApp' && (
                        <i className="fa-brands fa-whatsapp ml-1.5 text-green-500 text-sm"></i>
                      )}
                    </p>
                    <p className="text-stone-900 font-bold text-lg group-hover:text-orange-600 transition-colors">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <h4 className="font-bold text-stone-900 mb-4 flex items-center">
                <i className="fa-solid fa-clock text-orange-600 mr-2"></i>
                Jam Operasional
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-stone-600">
                <div>
                  <p className="font-medium">Senin - Jumat</p>
                  <p className="text-stone-400">09:00 - 21:00 WIB</p>
                </div>
                <div>
                  <p className="font-medium">Sabtu - Minggu</p>
                  <p className="text-stone-400">10:00 - 18:00 WIB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 relative overflow-hidden border border-stone-100">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <i className="fa-solid fa-paper-plane text-9xl -rotate-12"></i>
              </div>
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Nama Lengkap</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Masukkan nama Anda"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-600 focus:bg-white outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="email@contoh.com"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-600 focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Subjek</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-600 focus:bg-white outline-none transition-all"
                  >
                    <option>Inquiry Produk</option>
                    <option>Cek Stok</option>
                    <option>Kerja Sama / Reseller</option>
                    <option>Komplain Pesanan</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Pesan</label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tuliskan pesan Anda di sini..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-orange-600 focus:bg-white outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 bg-stone-900 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-3 hover:bg-black active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <span>Kirim Pesan</span>
                      <i className="fa-solid fa-paper-plane text-xs opacity-50"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;