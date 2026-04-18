
import React, { useState, useRef, useEffect } from 'react';

interface AboutSectionProps {
  onJoin: (email: string) => void;
  scrollY: number;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onJoin, scrollY }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionOffset, setSectionOffset] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setSectionOffset(sectionRef.current.offsetTop);
    }
  }, []);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && !isSubmitting) {
      setIsSubmitting(true);
      onJoin(email);
      setTimeout(() => {
        setIsSubmitting(false);
        setEmail('');
      }, 2000);
    }
  };

  const benefits = [
    { icon: 'fa-bolt', text: 'Info Drop Tercepat' },
    { icon: 'fa-tag', text: 'Diskon Khusus Member' },
    { icon: 'fa-comments', text: 'Diskusi Streetwear' }
  ];

  // Calculate parallax offset
  const parallaxValue = (scrollY - sectionOffset) * 0.15;

  return (
    <section ref={sectionRef} className="py-24 bg-stone-900 text-white overflow-hidden relative min-h-[800px] flex items-center">
      
      {/* Parallax Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none scale-110"
        style={{ 
          transform: `translateY(${parallaxValue}px)`,
          backgroundImage: `url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1920')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          willChange: 'transform'
        }}
      />

      {/* Background patterns overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-1">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Visual Side */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800" 
                alt="JTRIFT Workshop Culture" 
                className="w-full h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating Achievement Card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl hidden md:block animate-bounce-in">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <i className="fa-solid fa-trophy text-xl"></i>
                </div>
                <div>
                  <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">Quality Award</p>
                  <p className="text-stone-900 font-bold text-sm">Best Local Craft 2023</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center space-x-2 text-orange-500 mb-4">
              <span className="h-[1px] w-8 bg-orange-500"></span>
              <span className="text-xs font-black uppercase tracking-[0.3em]">Misi Kami</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold font-heading mb-8 tracking-tighter leading-none">
              MERAYAKAN <br />
              <span className="text-orange-600">IDENTITAS LOKAL.</span>
            </h2>
            
            <div className="space-y-6 text-stone-300 leading-relaxed text-lg font-light mb-12">
              <p>
                JTRIFT lahir dari sebuah keyakinan sederhana: bahwa <span className="text-white font-medium">kualitas perajin lokal Indonesia</span> memiliki standar yang mampu bersaing di panggung global. Kami membangun platform ini bukan sekadar untuk berjualan, melainkan untuk memberikan wadah bagi mahakarya yang diciptakan dengan tangan-tangan terampil anak bangsa.
              </p>
              <p className="text-stone-400">
                Alasan kami mendirikan JTRIFT adalah untuk mengubah persepsi tentang brand lokal. Kami ingin setiap orang yang memakai jaket kami merasakan kebanggaan akan warisan street culture Bekasi yang autentik—sebuah perpaduan antara <span className="text-orange-500">inovasi tekstil modern</span> dan semangat independen yang pantang menyerah. Karena bagi kami, setiap jahitan adalah cerita tentang dedikasi.
              </p>
            </div>

            {/* Enhanced Join Community Feature */}
            <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-md relative group transition-all duration-500 hover:bg-white/[0.08] hover:border-orange-600/50 shadow-2xl">
              <div className="absolute -top-3 right-8 bg-orange-600 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                Exclusive Community
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-600/30">
                  <i className="fa-solid fa-users-viewfinder text-2xl"></i>
                </div>
                <div>
                  <h4 className="text-2xl font-bold font-heading">Gabung Pergerakan</h4>
                  <div className="flex items-center mt-1">
                    <span className="flex space-x-[-8px]">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-5 h-5 rounded-full border border-stone-800 bg-stone-700 overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="member" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </span>
                    <span className="text-[10px] text-stone-400 ml-3 font-bold uppercase tracking-wider">5.2k+ Members Online</span>
                  </div>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center space-x-2 text-stone-300 text-xs">
                    <i className={`fa-solid ${b.icon} text-orange-500 w-4`}></i>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <div className="relative group">
                  <i className="fa-solid fa-at absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-orange-500 transition-colors"></i>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan email pergerakan Anda..."
                    className="w-full bg-stone-800/50 border border-white/5 rounded-2xl py-5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-600 focus:bg-stone-800 outline-none transition-all placeholder:text-stone-600"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-5 px-8 rounded-2xl transition-all shadow-xl shadow-orange-600/20 active:scale-[0.98] flex items-center justify-center space-x-3 overflow-hidden group/btn"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span className="tracking-widest">GABUNG SEKARANG</span>
                      <i className="fa-solid fa-arrow-right-long text-xs transition-transform group-hover/btn:translate-x-2"></i>
                    </>
                  )}
                </button>
              </form>
              
              <p className="text-[9px] text-stone-500 mt-5 text-center uppercase tracking-[0.3em] font-black">
                Aman • Akses Eksklusif Ke Info Drop Terbaru JTRIFT
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
