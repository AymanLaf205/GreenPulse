"use client";

import { createContext, useContext, useState, useEffect } from 'react';

interface I18nContextType {
  locale: string;
  setLocale: (locale: string) => void;
  dir: string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

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

  const value = {
    locale,
    setLocale: handleSetLocale,
    dir,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}