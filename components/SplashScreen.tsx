
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [coords, setCoords] = useState('6.2349° S, 106.9896° E');

  const getStatus = (p: number) => {
    if (p < 20) return "INITIALIZING SYSTEM...";
    if (p < 40) return "SOURCING PREMIUM FABRIC...";
    if (p < 70) return "REINFORCING STITCHES...";
    if (p < 90) return "QUALITY CURATION IN PROGRESS...";
    return "JTRIFT SYSTEM READY.";
  };

  useEffect(() => {
    // Progress increment logic
    const duration = 2800; // total duration
    const interval = 30; // update frequency
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });

      // Randomize coords slightly for "scanning" effect
      if (Math.random() > 0.8) {
        setCoords(`${(6.2349 + Math.random() * 0.01).toFixed(4)}° S, ${(106.9896 + Math.random() * 0.01).toFixed(4)}° E`);
      }
    }, interval);

    // Exit sequence
    const exitTimer = setTimeout(() => setIsVisible(false), 3200);
    const completeTimer = setTimeout(() => onComplete(), 3900);

    return () => {
      clearInterval(timer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-stone-950 transition-all duration-1000 cubic-bezier ${isVisible ? 'opacity-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      {/* Scanning Laser Line */}
      <div className={`absolute inset-x-0 h-[1px] bg-orange-600/40 shadow-[0_0_20px_rgba(234,88,12,0.6)] z-20 pointer-events-none ${progress < 100 ? 'animate-scan' : 'opacity-0'}`}></div>

      <div className="relative flex flex-col items-center">
        {/* Brand Identity */}
        <div className="relative mb-4">
          <h1 className="text-7xl md:text-9xl font-black font-heading text-white tracking-tighter animate-glitch" data-text="JTRIFT">
            JTRIFT<span className="text-orange-600">.</span>
          </h1>
          <div className="absolute -top-6 -right-6 px-2 py-1 border border-white/10 rounded text-[8px] font-mono text-stone-500 uppercase tracking-widest">
            STREET HERITAGE / {new Date().getFullYear()}
          </div>
        </div>

        {/* Progress Display */}
        <div className="relative mt-12 flex flex-col items-center w-64">
          {/* Numerical Percentage */}
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-5xl font-black font-heading text-white tabular-nums">
              {Math.floor(progress)}
            </span>
            <span className="text-orange-600 font-bold text-xl">%</span>
          </div>

          {/* Stitch Progress Bar */}
          <div className="w-full h-[3px] bg-stone-900 rounded-full relative overflow-hidden mb-6">
            {/* The "Stitch" pattern background */}
            <div className="absolute inset-0 flex space-x-2 opacity-20">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="h-full w-2 bg-stone-600"></div>
              ))}
            </div>
            
            {/* Real Progress */}
            <div 
              className="absolute top-0 left-0 h-full bg-orange-600 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(234,88,12,0.8)]"
              style={{ width: `${progress}%` }}
            >
              {/* Needle Head Effect */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-white shadow-[0_0_15px_#fff] rounded-full"></div>
            </div>
          </div>

          {/* Dynamic Info */}
          <div className="w-full flex justify-between items-center">
            <p className="text-stone-500 uppercase tracking-[0.2em] text-[8px] font-black animate-pulse">
              {getStatus(progress)}
            </p>
            <p className="text-orange-600/50 font-mono text-[8px] tracking-tighter">
              {coords}
            </p>
          </div>
        </div>

        {/* Footer Technical Specs */}
        <div className="absolute bottom-[-140px] flex space-x-12 opacity-20 group">
          <div className="text-center border-l border-white/20 pl-4">
            <span className="block text-[7px] text-stone-500 uppercase font-bold tracking-widest">Material Status</span>
            <span className="text-white font-mono text-[10px]">{progress > 30 ? 'AUTHENTIC' : 'VERIFYING...'}</span>
          </div>
          <div className="text-center border-l border-white/20 pl-4">
            <span className="block text-[7px] text-stone-500 uppercase font-bold tracking-widest">Source Origin</span>
            <span className="text-white font-mono text-[10px]">BEKASI, ID</span>
          </div>
          <div className="text-center border-l border-white/20 pl-4">
            <span className="block text-[7px] text-stone-500 uppercase font-bold tracking-widest">Encrypted Code</span>
            <span className="text-white font-mono text-[10px]">JT-X{Math.floor(progress * 123)}</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-scan {
          animation: scan 1.5s linear infinite;
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          10% { transform: translate(-2px, 1px); }
          20% { transform: translate(1px, -2px); }
          30% { transform: translate(-1px, 2px); }
          40% { transform: translate(1px, 1px); }
          50% { transform: translate(-1px, -1px); }
          100% { transform: translate(0); }
        }
        .animate-glitch {
          animation: glitch 4s infinite step-end;
        }

        h1::before, h1::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.5;
        }
        h1::before {
          color: #ff3c00;
          z-index: -1;
          animation: glitch 0.5s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(-1px, -1px);
        }
        h1::after {
          color: #00fff2;
          z-index: -2;
          animation: glitch 0.5s infinite reverse;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          transform: translate(1px, 1px);
          opacity: 0.1;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
