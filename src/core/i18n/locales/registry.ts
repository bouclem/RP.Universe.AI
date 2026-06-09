import type { DeepPartialMessageTree } from "../types";
import { enMessages, enMetadata, type LocaleMessages } from "./en";
import { esMessages, esMetadata } from "./es";
import { frMessages, frMetadata } from "./fr";

export interface LocaleMetadata {
  name: string;
  label: string;
}

export const localeRegistry = {
  en: { messages: enMessages, metadata: enMetadata },
  es: { messages: esMessages, metadata: esMetadata },
  fr: { messages: frMessages, metadata: frMetadata },
} as const satisfies Record<
  string,
  { messages: DeepPartialMessageTree<LocaleMessages>; metadata: LocaleMetadata }
>;

export type Locale = keyof typeof localeRegistry;

export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "es", "fr"];

export function getLocaleMetadata(locale: Locale): LocaleMetadata {
  return localeRegistry[locale].metadata;
}

export type { LocaleMessages };
