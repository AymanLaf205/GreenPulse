"use client";

import { useI18n } from "@/components/i18n-provider";

export function Footer() {
  const { locale } = useI18n();

  return (
    <footer className="w-full py-6 border-t">
      <div className="container flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-lg font-semibold">
          {locale === 'ar'
            ? 'شكراً لزيارتكم جرين بلس'
            : 'Thanks for visiting GreenPulse'}
        </p>
        <p className="text-sm text-muted-foreground">
          {locale === 'ar'
            ? '© ٢٠٢٤ جميع الحقوق محفوظة'
            : '© 2024 All rights reserved'}
        </p>
      </div>
    </footer>
  );
}
