import React from 'react';
import { useLocale } from '../localization/LocaleProvider';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { tr } = useLocale();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F8F9FA] pt-20">
      
      {/* خلفيات متحركة */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4AF37]/20 rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#0B3B2D]/10 rounded-full blur-[150px] animate-[pulse_8s_ease-in-out_infinite_1s]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-full mb-8 shadow-sm animate-[float_4s_ease-in-out_infinite]">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-sm font-semibold text-[#0B3B2D]">{tr('appName')}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-[#0B3B2D] mb-6 leading-tight animate-[fadeInUp_0.8s_ease-out]">
          {tr('heroTitle')}
        </h1>

        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 animate-[fadeInUp_1s_ease-out_0.2s_both]">
          {tr('heroSubtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadeInUp_1.2s_ease-out_0.4s_both]">
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3 bg-gradient-to-l from-[#0B3B2D] to-[#135c47] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-[#0B3B2D]/30 transition-all duration-300 w-full sm:w-auto justify-center hover:-translate-y-1"
          >
            {tr('learnMore')}
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* حركة أسهم للأسفل */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400 cursor-pointer hover:text-[#0B3B2D] transition-colors" 
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
}