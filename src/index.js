/**
 * Formats a phone number string into a standardized format
 * @param {string} phoneNumber - The phone number to format (digits only or with some formatting)
 * @param {Object} options - Formatting options
 * @param {string} options.format - Format type: 'us' (default), 'international'
 * @param {string} options.countryCode - Country code for international format (default: '1' for US)
 * @returns {string} Formatted phone number
 */
function formatPhoneNumber(phoneNumber, options = {}) {
  if (!phoneNumber) {
    throw new Error("Phone number is required");
  }

  const { format = "us", countryCode = "1" } = options;

  // Remove all non-digit characters
  const digits = phoneNumber.toString().replace(/\D/g, "");

  if (digits.length === 0) {
    throw new Error("Phone number must contain at least one digit");
  }

  // Handle US phone numbers (10 or 11 digits)
  if (format === "us" || format === "US") {
    return formatUSPhoneNumber(digits);
  }

  // Handle international format
  if (format === "international") {
    return formatInternationalPhoneNumber(digits, countryCode);
  }

  throw new Error(`Unsupported format: ${format}`);
}

/**
 * Formats a US phone number
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
 * Formats an international phone number
 * @param {string} digits - Digits only string
 * @param {string} countryCode - Country code
 * @returns {string} Formatted international phone number
 */
function formatInternationalPhoneNumber(digits, countryCode) {
  const code = countryCode.toString();

  // If digits already include the country code, don't add it again
  if (digits.startsWith(code)) {
    return `+${digits}`;
  }

  return `+${code} ${digits}`;
}

/**
 * Validates if a phone number string contains valid characters
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} True if valid format
 */
function isValidPhoneNumber(phoneNumber) {
  if (!phoneNumber) return false;

  // Allow digits, spaces, parentheses, hyphens, plus sign, and dots
  const validPattern = /^[\d\s\-\(\)\+\.]+$/;
  return validPattern.test(phoneNumber.toString());
}

/**
 * Extracts just the digits from a phone number
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
};
