export interface FormatOptions {
  format?: "us" | "US" | "international" | "national" | "e164";
  countryCode?: string;
  autoDetect?: boolean;
  strict?: boolean;
}

export interface ValidationOptions {
  countryCode?: string;
  strict?: boolean;
}

export interface CountryInfo {
  name: string;
  iso2: string;
  iso3: string;
  dialCode: string;
  flag: string;
}

export interface DetectedCountry {
  dialCode: string;
  countries: CountryInfo[];
  remainingDigits: string;
}

export interface PhoneNumberInfo {
  valid: boolean;
  originalInput: string;
  digits: string;
  length: number;
  possibleCountries: Array<{
    dialCode: string;
    countries: Array<{
      name: string;
      iso2: string;
      iso3: string;
      flag: string;
    }>;
    nationalNumber: string;
  }>;
  formats: {
    international: string;
    e164: string;
    national: string;
  } | null;
  error?: string;
}

export interface DatabaseStats {
  totalCountries: number;
  totalDialCodes: number;
  averageDialCodeLength: number;
  shortestDialCode: string;
  longestDialCode: string;
  commonRegions: Record<string, number>;
  version: string;
  lastUpdated: string;
}

export interface SearchCriteria {
  name?: string;
  dialCode?: string;
  iso2?: string;
  iso3?: string;
}

export interface PhoneUtils {
  getCountryByDialCode(dialCode: string): CountryInfo | null;
  getCountryByISO2(iso2: string): CountryInfo | null;
  getCountryByISO3(iso3: string): CountryInfo | null;
  getCountryByName(name: string): CountryInfo | null;
  getCountriesByDialCode(dialCode: string): CountryInfo[];
  searchCountries(criteria: SearchCriteria): CountryInfo[];
  detectCountryFromPhoneNumber(phoneNumber: string): DetectedCountry[];
  formatPhoneNumberForCountry(phoneNumber: string, countryCode: string): string;
  getAllDialCodes(): string[];
  isValidDialCode(dialCode: string): boolean;
  getDatabaseStats(): DatabaseStats;
  phoneDatabase: {
    countries: CountryInfo[];
    metadata: {
      version: string;
      lastUpdated: string;
      totalCountries: number;
      description: string;
      license: string;
    };
  };
}

export function formatPhoneNumber(
  phoneNumber: string,
  options?: FormatOptions
): string;

export function isValidPhoneNumber(
  phoneNumber: string,
  options?: ValidationOptions
): boolean;

export function extractDigits(phoneNumber: string): string;

export function getPhoneNumberInfo(phoneNumber: string): PhoneNumberInfo;

export const phoneUtils: PhoneUtils;
