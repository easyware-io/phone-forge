export interface FormatOptions {
  format?: "us" | "US" | "international";
  countryCode?: string;
}

export function formatPhoneNumber(
  phoneNumber: string,
  options?: FormatOptions
): string;
export function isValidPhoneNumber(phoneNumber: string): boolean;
export function extractDigits(phoneNumber: string): string;
