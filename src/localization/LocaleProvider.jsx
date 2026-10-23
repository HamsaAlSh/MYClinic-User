import React, { createContext, useContext, useEffect, useState } from 'react';
import { dictionary } from './dictionary';

const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => localStorage.getItem('app_locale') || 'ar');

  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    localStorage.setItem('app_locale', locale);
  }, [locale]);

  const toggleLocale = () => setLocale(prev => (prev === 'ar' ? 'en' : 'ar'));
  const tr = (key) => dictionary[locale]?.[key] || key;

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale, tr }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);