import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../localization/LocaleProvider';
import { LogIn } from 'lucide-react';

export default function ContactSection() {
  const { tr } = useLocale();
  const navigate = useNavigate();

  return (
    <section id="contact" className="py-24 bg-[#041a14] relative overflow-hidden">
      {/* خلفية تفاعلية (بدون صورة مكسورة) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-[#D4AF37]/20 to-transparent blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0B3B2D]/30 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-[fadeInUp_0.8s_ease-out]">
          {tr('ctaTitle')}
        </h2>
        
        <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto animate-[fadeInUp_1s_ease-out_0.2s_both]">
          {tr('ctaDesc')}
        </p>

        {/* زر تسجيل الدخول الكبير */}
        <button 
          onClick={() => navigate('/login')}
          className="group relative flex items-center justify-center gap-3 bg-gradient-to-l from-[#D4AF37] to-[#AA8C2C] text-[#041a14] px-12 py-5 rounded-2xl font-bold text-xl shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 animate-[fadeInUp_1.2s_ease-out_0.4s_both]"
        >
          <LogIn className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          {tr('ctaButton')}
        </button>

      </div>
    </section>
  );
}