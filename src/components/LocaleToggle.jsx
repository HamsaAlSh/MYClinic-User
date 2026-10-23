import React from 'react';
import { Globe } from 'lucide-react';
import { useLocale } from '../localization/LocaleProvider';

export default function LocaleToggle() {
  const { locale, toggleLocale } = useLocale();

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-[#0B3B2D] hover:bg-[#0B3B2D] hover:text-white transition-all duration-300 border border-gray-200"
    >
      <Globe className="w-4 h-4" />
      <span>{locale === 'ar' ? 'EN' : 'ع'}</span>
    </button>
  );
}