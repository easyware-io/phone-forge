# Phone Forge

A comprehensive JavaScript library for formatting, validating, and analyzing phone numbers with a complete international phone database containing all world countries and their dial codes.

## Features

- 📱 **Smart Phone Number Formatting** - Multiple output formats (US, International, National, E.164)
- 🌍 **Complete Country Database** - 249+ countries with ISO codes and dial codes
- 🔍 **Auto Country Detection** - Automatically detect country from phone numbers
- ✅ **Enhanced Validation** - Country-specific validation rules
- 📊 **Phone Number Analysis** - Get detailed information about any phone number
- 🚀 **High Performance** - Optimized for speed and efficiency
- 🎯 **TypeScript Support** - Full TypeScript definitions included

## Installation

```bash
npm install phone-forge
```

## Quick Start

```javascript
const {
  formatPhoneNumber,
  isValidPhoneNumber,
  getPhoneNumberInfo,
  phoneUtils,
} = require("phone-forge");

// Basic formatting
formatPhoneNumber("2128691246");
// Returns: "+1 (212) 869-1246"

// International formatting with country detection
formatPhoneNumber("447700900123", {
  format: "international",
  autoDetect: true,
});
// Returns: "+44 7700900123"

// Get detailed phone number information
const info = getPhoneNumberInfo("447700900123");
console.log(info.possibleCountries[0].countries[0].name); // "United Kingdom"
```

## Core API

### formatPhoneNumber(phoneNumber, options?)

Enhanced phone number formatting with multiple format options and country detection.

**Parameters:**

- `phoneNumber` (string): The phone number to format
- `options` (object, optional):
  - `format` (string): Format type - 'us', 'international', 'national', 'e164'
  - `countryCode` (string): Country code (ISO2, ISO3, or dial code)
  - `autoDetect` (boolean): Auto-detect country from phone number
  - `strict` (boolean): Enable strict validation mode

**Examples:**

```javascript
// US format (default)
formatPhoneNumber("2128691246");
// "+1 (212) 869-1246"

// International format with specific country
formatPhoneNumber("15123456789", {
  format: "international",
  countryCode: "DE",
});
// "+49 15123456789"

// E.164 format
formatPhoneNumber("2128691246", {
  format: "e164",
  countryCode: "US",
});
// "+12128691246"

// National format
formatPhoneNumber("447700900123", {
  format: "national",
  autoDetect: true,
});
// "07700 900123" (UK national format)

// Auto-detection
formatPhoneNumber("33142868326", {
  format: "international",
  autoDetect: true,
});
// "+33 1 42 86 83 26"
```

### isValidPhoneNumber(phoneNumber, options?)

Enhanced validation with country-specific rules.

**Parameters:**

- `phoneNumber` (string): Phone number to validate
- `options` (object, optional):
  - `countryCode` (string): Expected country code
  - `strict` (boolean): Strict validation mode

**Examples:**

```javascript
isValidPhoneNumber("(212) 869-1246");
// true

isValidPhoneNumber("447700900123", { strict: true });
// true (valid international format)

isValidPhoneNumber("123", { strict: true });
// false (too short for any country)

isValidPhoneNumber("2128691246", { countryCode: "US" });
// true
```

### getPhoneNumberInfo(phoneNumber)

Get comprehensive information about a phone number.

**Returns:** Object with phone number analysis

```javascript
const info = getPhoneNumberInfo("447700900123");

console.log(info);
// {
//   valid: true,
//   originalInput: "447700900123",
//   digits: "447700900123",
//   length: 12,
//   possibleCountries: [{
//     dialCode: "+44",
//     countries: [{
//       name: "United Kingdom",
//       iso2: "GB",
//       iso3: "GBR",
//       flag: "🇬🇧"
//     }],
//     nationalNumber: "7700900123"
//   }],
//   formats: {
//     international: "+44 7700900123",
//     e164: "+447700900123",
//     national: "07700 900123"
//   }
// }
```

### extractDigits(phoneNumber)

Extract only digits from a phone number string.

```javascript
extractDigits("(212) 869-1246");
// "2128691246"
```

## Phone Database API

Access the comprehensive international phone database through `phoneUtils`:

### phoneUtils.getCountryByDialCode(dialCode)

```javascript
const country = phoneUtils.getCountryByDialCode("+49");
// {
//   name: "Germany",
//   iso2: "DE",
//   iso3: "DEU",
//   dialCode: "+49",
//   flag: "🇩🇪"
// }
```

### phoneUtils.getCountryByISO2(iso2) / getCountryByISO3(iso3)

```javascript
const country = phoneUtils.getCountryByISO2("US");
const country2 = phoneUtils.getCountryByISO3("USA");
```

### phoneUtils.getCountryByName(name)

```javascript
const country = phoneUtils.getCountryByName("United Kingdom");
```

### phoneUtils.detectCountryFromPhoneNumber(phoneNumber)

```javascript
const detected = phoneUtils.detectCountryFromPhoneNumber("4915123456789");
// Returns array of possible countries with dial code matches
```

### phoneUtils.searchCountries(criteria)

```javascript
const results = phoneUtils.searchCountries({
  name: "United",
  dialCode: "+1",
});
// Returns countries matching all criteria
```

### phoneUtils.getAllDialCodes()

```javascript
const codes = phoneUtils.getAllDialCodes();
// ["+1", "+7", "+20", "+27", "+30", "+31", ...]
```

### phoneUtils.getDatabaseStats()

```javascript
const stats = phoneUtils.getDatabaseStats();
// {
//   totalCountries: 249,
//   totalDialCodes: 230,
//   averageDialCodeLength: 3.2,
//   shortestDialCode: "+1",
//   longestDial
```
