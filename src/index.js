const phoneUtils = require("./phone-utils.js");

/**
 * Enhanced phone number formatting with country detection and validation
 * @param {string} phoneNumber - The phone number to format
 * @param {Object} options - Formatting options
 * @param {string} options.format - Format type: 'us', 'international', 'national', 'e164'
 * @param {string} options.countryCode - Country code (ISO2, ISO3, or dial code)
 * @param {boolean} options.autoDetect - Auto-detect country from phone number
 * @param {boolean} options.strict - Strict validation mode
 * @returns {string} Formatted phone number
 */
function formatPhoneNumber(phoneNumber, options = {}) {
  if (!phoneNumber) {
    throw new Error("Phone number is required");
  }

  const {
    format = "us",
    countryCode,
    autoDetect = false,
    strict = false,
  } = options;

  // Remove all non-digit characters
  const digits = phoneNumber.toString().replace(/\D/g, "");

  if (digits.length === 0) {
    throw new Error("Phone number must contain at least one digit");
  }

  let targetCountry = null;

  // Try to determine the country
  if (countryCode) {
    // First try as ISO codes
    targetCountry =
      phoneUtils.getCountryByISO2(countryCode) ||
      phoneUtils.getCountryByISO3(countryCode) ||
      phoneUtils.getCountryByDialCode(countryCode);

    if (!targetCountry) {
      throw new Error(`Unknown country code: ${countryCode}`);
    }
  } else if (autoDetect) {
    const detectedCountries = phoneUtils.detectCountryFromPhoneNumber(digits);
    if (detectedCountries.length > 0) {
      targetCountry = detectedCountries[0].countries[0]; // Take the first match
    }
  }

  // Handle different format types
  switch (format.toLowerCase()) {
    case "us":
    case "usa":
      return formatUSPhoneNumber(digits);

    case "international":
      return formatInternationalPhoneNumber(digits, targetCountry, strict);

    case "national":
      return formatNationalPhoneNumber(digits, targetCountry);

    case "e164":
      return formatE164PhoneNumber(digits, targetCountry);

    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}

/**
 * Enhanced US phone number formatting
 * @param {string} digits - Digits only string
 * @returns {string} Formatted US phone number
 */
function formatUSPhoneNumber(digits) {
  // Handle 11-digit numbers (with country code)
  if (digits.length === 11) {
    if (digits[0] !== "1") {
      throw new Error("11-digit numbers must start with country code 1");
    }
    const areaCode = digits.slice(1, 4);
    const exchange = digits.slice(4, 7);
    const number = digits.slice(7, 11);
    return `+1 (${areaCode}) ${exchange}-${number}`;
  }

  // Handle 10-digit numbers
  if (digits.length === 10) {
    const areaCode = digits.slice(0, 3);
    const exchange = digits.slice(3, 6);
    const number = digits.slice(6, 10);
    return `+1 (${areaCode}) ${exchange}-${number}`;
  }

  // Handle 7-digit numbers (local format)
  if (digits.length === 7) {
    const exchange = digits.slice(0, 3);
    const number = digits.slice(3, 7);
    return `${exchange}-${number}`;
  }

  throw new Error("US phone numbers must be 7, 10, or 11 digits long");
}

/**
 * Enhanced international phone number formatting
 * @param {string} digits - Digits only string
 * @param {Object} targetCountry - Target country object
 * @param {boolean} strict - Strict validation mode
 * @returns {string} Formatted international phone number
 */
function formatInternationalPhoneNumber(digits, targetCountry, strict = false) {
  if (targetCountry) {
    const dialCodeDigits = targetCountry.dialCode.replace(/\D/g, "");

    // Check if number already includes the country code
    if (digits.startsWith(dialCodeDigits)) {
      const nationalNumber = digits.substr(dialCodeDigits.length);

      if (strict && nationalNumber.length === 0) {
        throw new Error(
          "Invalid phone number: no national number after country code"
        );
      }

      return `${targetCountry.dialCode} ${nationalNumber}`;
    } else {
      return `${targetCountry.dialCode} ${digits}`;
    }
  }

  // No country information provided - throw error
  throw new Error(
    "Cannot format as international without country information. Use countryCode option or enable autoDetect."
  );
}

/**
 * Format phone number in national format
 * @param {string} digits - Digits only string
 * @param {Object} targetCountry - Target country object
 * @returns {string} Formatted national phone number
 */
function formatNationalPhoneNumber(digits, targetCountry) {
  if (!targetCountry) {
    // Try to detect country
    const detectedCountries = phoneUtils.detectCountryFromPhoneNumber(digits);
    if (detectedCountries.length > 0) {
      targetCountry = detectedCountries[0].countries[0];
      digits = detectedCountries[0].remainingDigits;
    }
  } else {
    // Remove country code if present
    const dialCodeDigits = targetCountry.dialCode.replace(/\D/g, "");
    if (digits.startsWith(dialCodeDigits)) {
      digits = digits.substr(dialCodeDigits.length);
    }
  }

  // Apply country-specific national formatting
  if (
    targetCountry &&
    (targetCountry.iso2 === "US" || targetCountry.iso2 === "CA")
  ) {
    // North American formatting
    if (digits.length === 10) {
      const areaCode = digits.slice(0, 3);
      const exchange = digits.slice(3, 6);
      const number = digits.slice(6, 10);
      return `(${areaCode}) ${exchange}-${number}`;
    }
  }

  // Generic national formatting
  return digits;
}

/**
 * Format phone number in E.164 format
 * @param {string} digits - Digits only string
 * @param {Object} targetCountry - Target country object
 * @returns {string} E.164 formatted phone number
 */
function formatE164PhoneNumber(digits, targetCountry) {
  if (targetCountry) {
    const dialCodeDigits = targetCountry.dialCode.replace(/\D/g, "");

    if (digits.startsWith(dialCodeDigits)) {
      return `+${digits}`;
    } else {
      return `+${dialCodeDigits}${digits}`;
    }
  }

  // No country information provided - throw error
  throw new Error("Cannot format as E.164 without country information");
}

/**
 * Enhanced phone number validation with country-specific rules
 * @param {string} phoneNumber - Phone number to validate
 * @param {Object} options - Validation options
 * @param {string} options.countryCode - Expected country code
 * @param {boolean} options.strict - Strict validation mode
 * @returns {boolean} True if valid
 */
function isValidPhoneNumber(phoneNumber, options = {}) {
  if (!phoneNumber) return false;

  const { countryCode, strict = false } = options;

  // Basic format validation
  const validPattern = /^[\d\s\-\(\)\+\.]+$/;
  if (!validPattern.test(phoneNumber.toString())) {
    return false;
  }

  const digits = phoneNumber.toString().replace(/\D/g, "");
  if (digits.length === 0) return false;

  // Country-specific validation
  if (countryCode) {
    const country =
      phoneUtils.getCountryByISO2(countryCode) ||
      phoneUtils.getCountryByISO3(countryCode) ||
      phoneUtils.getCountryByDialCode(countryCode);

    if (!country) return false;

    // Check if the number could belong to this country
    const dialCodeDigits = country.dialCode.replace(/\D/g, "");

    if (strict) {
      // In strict mode, number must start with the correct country code
      return digits.startsWith(dialCodeDigits);
    }
  }

  // Try to detect if it's a valid international number
  if (strict) {
    // In strict mode, check minimum length and detectability
    if (digits.length < 7) return false;

    const detectedCountries = phoneUtils.detectCountryFromPhoneNumber(digits);
    return detectedCountries.length > 0;
  }

  // Basic length validation
  return digits.length >= 7 && digits.length <= 15;
}

/**
 * Get information about a phone number
 * @param {string} phoneNumber - Phone number to analyze
 * @returns {Object} Phone number information
 */
function getPhoneNumberInfo(phoneNumber) {
  if (!phoneNumber) {
    return { valid: false, error: "Phone number is required" };
  }

  const digits = phoneNumber.toString().replace(/\D/g, "");

  if (digits.length === 0) {
    return { valid: false, error: "No digits found in phone number" };
  }

  const detectedCountries = phoneUtils.detectCountryFromPhoneNumber(digits);

  return {
    valid: true,
    originalInput: phoneNumber,
    digits: digits,
    length: digits.length,
    possibleCountries: detectedCountries.map((match) => ({
      dialCode: match.dialCode,
      countries: match.countries.map((c) => ({
        name: c.name,
        iso2: c.iso2,
        iso3: c.iso3,
        flag: c.flag,
      })),
      nationalNumber: match.remainingDigits,
    })),
    formats:
      detectedCountries.length > 0
        ? {
            international: formatInternationalPhoneNumber(
              digits,
              detectedCountries[0].countries[0]
            ),
            e164: formatE164PhoneNumber(
              digits,
              detectedCountries[0].countries[0]
            ),
            national: formatNationalPhoneNumber(
              digits,
              detectedCountries[0].countries[0]
            ),
          }
        : null,
  };
}

/**
 * Extract digits from phone number (unchanged from original)
 * @param {string} phoneNumber - Phone number string
 * @returns {string} Digits only
 */
function extractDigits(phoneNumber) {
  if (!phoneNumber) return "";
  return phoneNumber.toString().replace(/\D/g, "");
}

module.exports = {
  formatPhoneNumber,
  isValidPhoneNumber,
  extractDigits,
  getPhoneNumberInfo,

  // Export phone utilities for advanced usage
  phoneUtils,
};
