export type SupportedLocale = 'en' | 'fr' | 'es' | 'de' | 'ar' | 'pt';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'fr', 'es', 'de', 'ar', 'pt'];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

export const LOCALE_LABELS: Record<SupportedLocale, { name: string; nativeName: string; dir: 'ltr' | 'rtl' }> = {
  en: { name: 'English', nativeName: 'English', dir: 'ltr' },
  fr: { name: 'French', nativeName: 'Français', dir: 'ltr' },
  es: { name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  de: { name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
  ar: { name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  pt: { name: 'Portuguese', nativeName: 'Português', dir: 'ltr' },
};

/**
 * Normalizes a raw locale code (e.g. "en-US", "fr-FR") to a supported locale.
 */
export function normalizeLocale(rawLocale?: string | null): SupportedLocale {
  if (!rawLocale) return DEFAULT_LOCALE;
  const clean = rawLocale.toLowerCase().slice(0, 2) as SupportedLocale;
  return SUPPORTED_LOCALES.includes(clean) ? clean : DEFAULT_LOCALE;
}

/**
 * Merges a localized dictionary with a default English fallback to prevent missing translation keys.
 */
export function mergeWithFallback<T extends Record<string, any>>(
  targetDict: Partial<T>,
  fallbackDict: T
): T {
  const result = { ...fallbackDict };
  for (const [key, value] of Object.entries(targetDict)) {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object' && !Array.isArray(value) && typeof (result as any)[key] === 'object') {
        (result as any)[key] = mergeWithFallback(value, (result as any)[key]);
      } else {
        (result as any)[key] = value;
      }
    }
  }
  return result;
}

/**
 * Formats a date string according to the active locale.
 */
export function formatDateLocale(
  dateInput: string | Date,
  locale: SupportedLocale = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return typeof dateInput === 'string' ? dateInput : '';
    return new Intl.DateTimeFormat(locale, options || { month: 'short', year: 'numeric' }).format(d);
  } catch {
    return typeof dateInput === 'string' ? dateInput : '';
  }
}
