"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const I18nContext = createContext({
  locale: 'en',
  setLocale: (locale: string) => {},
  dir: 'ltr' as 'ltr' | 'rtl',
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState('en');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocale(savedLocale);
    setDir(savedLocale === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.dir = savedLocale === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const handleSetLocale = (newLocale: string) => {
    setLocale(newLocale);
    setDir(newLocale === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('locale', newLocale);
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);