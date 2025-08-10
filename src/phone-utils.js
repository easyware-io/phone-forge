const phoneDatabase = require("./phone-database.json");

/**
 * Get country information by dial code
 * @param {string} dialCode - The dial code (with or without +)
 * @returns {Object|null} Country object or null if not found
 */
function getCountryByDialCode(dialCode) {
  const normalizedCode = dialCode.startsWith("+") ? dialCode : `+${dialCode}`;
  return (
    phoneDatabase.countries.find(
      (country) => country.dialCode === normalizedCode
    ) || null
  );
}

/**
 * Get country information by ISO2 code
 * @param {string} iso2 - The ISO2 country code (e.g., 'US', 'DE')
 * @returns {Object|null} Country object or null if not found
 */
function getCountryByISO2(iso2) {
  return (
    phoneDatabase.countries.find(
      (country) => country.iso2.toLowerCase() === iso2.toLowerCase()
    ) || null
  );
}

/**
 * Get country information by ISO3 code
 * @param {string} iso3 - The ISO3 country code (e.g., 'USA', 'DEU')
 * @returns {Object|null} Country object or null if not found
 */
function getCountryByISO3(iso3) {
  return (
    phoneDatabase.countries.find(
      (country) => country.iso3.toLowerCase() === iso3.toLowerCase()
    ) || null
  );
}

/**
 * Get country information by name (case-insensitive partial match)
 * @param {string} name - The country name or partial name
 * @returns {Object|null} Country object or null if not found
 */
function getCountryByName(name) {
  return (
    phoneDatabase.countries.find((country) =>
      country.name.toLowerCase().includes(name.toLowerCase())
    ) || null
  );
}

/**
 * Get all countries that share the same dial code
 * @param {string} dialCode - The dial code (with or without +)
 * @returns {Array} Array of country objects
 */
function getCountriesByDialCode(dialCode) {
  const normalizedCode = dialCode.startsWith("+") ? dialCode : `+${dialCode}`;
  return phoneDatabase.countries.filter(
    (country) => country.dialCode === normalizedCode
  );
}

/**
 * Search countries by various criteria
 * @param {Object} criteria - Search criteria
 * @param {string} criteria.name - Country name (partial match)
 * @param {string} criteria.dialCode - Dial code
 * @param {string} criteria.iso2 - ISO2 code
 * @param {string} criteria.iso3 - ISO3 code
 * @returns {Array} Array of matching country objects
 */
function searchCountries(criteria) {
  return phoneDatabase.countries.filter((country) => {
    if (
      criteria.name &&
      !country.name.toLowerCase().includes(criteria.name.toLowerCase())
    ) {
      return false;
    }
    if (criteria.dialCode) {
      const normalizedCode = criteria.dialCode.startsWith("+")
        ? criteria.dialCode
        : `+${criteria.dialCode}`;
      if (country.dialCode !== normalizedCode) {
        return false;
      }
    }
    if (
      criteria.iso2 &&
      country.iso2.toLowerCase() !== criteria.iso2.toLowerCase()
    ) {
      return false;
    }
    if (
      criteria.iso3 &&
      country.iso3.toLowerCase() !== criteria.iso3.toLowerCase()
    ) {
      return false;
    }
    return true;
  });
}

/**
 * Detect country from phone number
 * @param {string} phoneNumber - The phone number
 * @returns {Array} Array of possible countries (multiple if dial codes overlap)
 */
function detectCountryFromPhoneNumber(phoneNumber) {
  const digits = phoneNumber.replace(/\D/g, "");

  if (digits.length === 0) {
    return [];
  }

  // Try to match dial codes starting from longest possible
  const possibleCodes = [];

  // Check for codes up to 5 digits (longest international codes)
  for (let i = 1; i <= Math.min(5, digits.length); i++) {
    const code = `+${digits.substr(0, i)}`;
    const countries = getCountriesByDialCode(code);
    if (countries.length > 0) {
      possibleCodes.push({
        dialCode: code,
        countries: countries,
        remainingDigits: digits.substr(i),
      });
    }
  }

  // Return the matches, prioritizing longer dial codes
  return possibleCodes.sort((a, b) => b.dialCode.length - a.dialCode.length);
}

/**
 * Format phone number for specific country
 * @param {string} phoneNumber - The phone number
 * @param {string} countryCode - ISO2 or ISO3 country code
 * @returns {string} Formatted phone number
 */
function formatPhoneNumberForCountry(phoneNumber, countryCode) {
  const country =
    getCountryByISO2(countryCode) || getCountryByISO3(countryCode);

  if (!country) {
    throw new Error(`Country not found: ${countryCode}`);
  }

  const digits = phoneNumber.replace(/\D/g, "");
  const dialCodeDigits = country.dialCode.replace(/\D/g, "");

  // Remove country code if present
  let localDigits = digits;
  if (digits.startsWith(dialCodeDigits)) {
    localDigits = digits.substr(dialCodeDigits.length);
  }

  return `${country.dialCode} ${localDigits}`;
}

/**
 * Get all available dial codes
 * @returns {Array} Array of unique dial codes
 */
function getAllDialCodes() {
  const codes = [
    ...new Set(phoneDatabase.countries.map((country) => country.dialCode)),
  ];
  return codes.sort((a, b) => {
    // Sort by numeric value of the dial code
    const aNum = parseInt(a.replace(/\D/g, ""));
    const bNum = parseInt(b.replace(/\D/g, ""));
    return aNum - bNum;
  });
}

/**
 * Validate if a dial code exists
 * @param {string} dialCode - The dial code to validate
 * @returns {boolean} True if dial code exists
 */
function isValidDialCode(dialCode) {
  const normalizedCode = dialCode.startsWith("+") ? dialCode : `+${dialCode}`;
  return phoneDatabase.countries.some(
    (country) => country.dialCode === normalizedCode
  );
}

/**
 * Get database statistics
 * @returns {Object} Statistics about the phone database
 */
function getDatabaseStats() {
  const dialCodes = getAllDialCodes();
  const regions = {
    "+1": phoneDatabase.countries.filter((c) => c.dialCode.startsWith("+1"))
      .length,
    "+7": phoneDatabase.countries.filter((c) => c.dialCode === "+7").length,
    "+44": phoneDatabase.countries.filter((c) => c.dialCode === "+44").length,
    "+33": phoneDatabase.countries.filter((c) => c.dialCode === "+33").length,
    "+49": phoneDatabase.countries.filter((c) => c.dialCode === "+49").length,
  };

  return {
    totalCountries: phoneDatabase.countries.length,
    totalDialCodes: dialCodes.length,
    averageDialCodeLength:
      dialCodes.reduce((sum, code) => sum + code.length, 0) / dialCodes.length,
    shortestDialCode: dialCodes.reduce((shortest, code) =>
      code.length < shortest.length ? code : shortest
    ),
    longestDialCode: dialCodes.reduce((longest, code) =>
      code.length > longest.length ? code : longest
    ),
    commonRegions: regions,
    version: phoneDatabase.metadata.version,
    lastUpdated: phoneDatabase.metadata.lastUpdated,
  };
}

module.exports = {
  getCountryByDialCode,
  getCountryByISO2,
  getCountryByISO3,
  getCountryByName,
  getCountriesByDialCode,
  searchCountries,
  detectCountryFromPhoneNumber,
  formatPhoneNumberForCountry,
  getAllDialCodes,
  isValidDialCode,
  getDatabaseStats,
  phoneDatabase,
};
