"use client";

import { useCallback } from 'react';
import { useI18n } from '@/components/i18n-provider';
import type { Translations } from '@/types/translations';
import en from '@/translations/en.json';
import ar from '@/translations/ar.json';

const translations: Record<string, Translations> = { en, ar };

export function useTranslation() {
  const { locale } = useI18n();
  
  const t = useCallback((key: string, params?: Record<string, any>) => {
    const keys = key.split('.');
    let value = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
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