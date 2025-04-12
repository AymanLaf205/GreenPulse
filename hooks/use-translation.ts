"use client";

import { useCallback } from 'react';
import { useI18n } from '@/components/i18n-provider';
import type { Translations } from '@/types/translations';

const translations: Record<string, Translations> = {
  en: require('@/translations/en.json'),
  ar: require('@/translations/ar.json')
};

export function useTranslation() {
  const { locale } = useI18n();
  
  const t = useCallback((key: string, params?: Record<string, any>) => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, k) => params[k]?.toString() ?? '');
    }

    return value;
  }, [locale]);

  return t;
}