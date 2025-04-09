"use client";

import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useI18n } from "./i18n-provider";
import { useTranslation } from "@/hooks/use-translation";

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();
  const t = useTranslation();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
    >
      <Languages className="h-4 w-4" />
    </Button>
  );
}