"use client";

import { useI18n } from '@/components/i18n-provider';
import en from '@/app/i18n/locales/en.json';
import ar from '@/app/i18n/locales/ar.json';

const translations = { en, ar };

type InterpolationValues = {
  [key: string]: string | number;
};

export function useTranslation() {
  const { locale } = useI18n();

  return function t(key: string, interpolation?: InterpolationValues): string {
    const keys = key.split('.');
    let value = translations[locale as keyof typeof translations];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k as keyof typeof value];
      }
    }

    if (typeof value === 'string' && interpolation) {
      return Object.entries(interpolation).reduce((str, [key, val]) => {
        return str.replace(`{{${key}}}`, String(val));
      }, value);
    }

    return value as string || key;
  };
}