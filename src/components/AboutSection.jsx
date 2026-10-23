import React from 'react';
import { useLocale } from '../localization/LocaleProvider';
import { Stethoscope, Microscope, HeartPulse } from 'lucide-react';

export default function AboutSection() {
  const { tr } = useLocale();

  const features = [
    { icon: Stethoscope, title: tr('feature1Title'), desc: tr('feature1Desc') },
    { icon: Microscope, title: tr('feature2Title'), desc: tr('feature2Desc') },
    { icon: HeartPulse, title: tr('feature3Title'), desc: tr('feature3Desc') },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B3B2D] mb-4">{tr('aboutTitle')}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">{tr('aboutDesc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div key={idx} className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              {/* خلفية تظهر عند الهوفر */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B3B2D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#0B3B2D]/5 text-[#0B3B2D] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0B3B2D] group-hover:text-[#D4AF37] transition-all duration-500">
                  <feat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0B3B2D] mb-3">{feat.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}