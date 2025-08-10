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
//   longestDialCode: "+1684",
//   commonRegions: { "+1": 25, "+7": 2, "+44": 4, ... },
//   version: "1.0.0",
//   lastUpdated: "2025-08-10"
// }
```

## Supported Formats

- **US Format:** `+1 (XXX) XXX-XXXX`
- **International Format:** `+CC XXXXXXXXXX`
- **National Format:** Country-specific national formatting
- **E.164 Format:** `+CCXXXXXXXXXX` (ITU-T standard)
- **Local Format:** `XXX-XXXX` (for 7-digit numbers)

## Country Database

The library includes a comprehensive database with **249 countries** and territories, featuring:

- **Country Names** - Full official names
- **ISO Codes** - Both ISO2 (US) and ISO3 (USA) formats
- **Dial Codes** - International calling codes with + prefix
- **Flag Emojis** - Unicode flag representations
- **Complete Coverage** - All UN member states plus territories

### Database Features

- 🔍 **Smart Search** - Search by name, codes, or dial codes
- 🎯 **Auto-Detection** - Intelligent country detection from phone numbers
- 📱 **Multiple Matches** - Handle countries sharing dial codes (like +1 region)
- ⚡ **Fast Lookups** - Optimized for performance
- 🔄 **Up-to-Date** - Regularly maintained country information

## Advanced Usage Examples

### Country-Specific Formatting

```javascript
// Format a German mobile number
const germanNumber = formatPhoneNumber("15123456789", {
  format: "international",
  countryCode: "DE",
});
// "+49 15123456789"

// Format for France with auto-detection
const frenchNumber = formatPhoneNumber("33142868326", {
  format: "national",
  autoDetect: true,
});
// "01 42 86 83 26"
```

### Multi-Country Dial Code Handling

```javascript
// Handle +1 region (US, Canada, Caribbean)
const countries = phoneUtils.getCountriesByDialCode("+1");
console.log(countries.map((c) => c.name));
// ["United States", "Canada", "Bahamas", "Barbados", ...]

// Detect specific country from full number
const info = getPhoneNumberInfo("12128691246");
console.log(info.possibleCountries[0].countries[0].name);
// "United States" (or "Canada" - both use +1)
```

### Validation with Country Context

```javascript
// Strict validation for specific country
const isValidUS = isValidPhoneNumber("2128691246", {
  countryCode: "US",
  strict: true,
});

// Validate international format
const isValidIntl = isValidPhoneNumber("447700900123", {
  strict: true,
});
```

### Batch Processing

```javascript
const phoneNumbers = [
  "2128691246", // US
  "447700900123", // UK
  "4915123456789", // Germany
  "33142868326", // France
];

const results = phoneNumbers.map((number) => {
  const info = getPhoneNumberInfo(number);
  return {
    original: number,
    country: info.possibleCountries[0]?.countries[0]?.name,
    international: info.formats?.international,
    valid: info.valid,
  };
});

console.log(results);
```

## Error Handling

The library provides detailed error messages for various scenarios:

```javascript
// Missing phone number
formatPhoneNumber("");
// Error: "Phone number is required"

// Invalid country code
formatPhoneNumber("123456789", { countryCode: "XX" });
// Error: "Unknown country code: XX"

// Insufficient information for international format
formatPhoneNumber("123456789", { format: "international" });
// Error: "Cannot format as international without country information"

// Invalid US format
formatPhoneNumber("22128691246");
// Error: "11-digit numbers must start with country code 1"
```

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import {
  formatPhoneNumber,
  isValidPhoneNumber,
  getPhoneNumberInfo,
  phoneUtils,
  FormatOptions,
  PhoneNumberInfo,
  CountryInfo,
} from "phone-forge";

const options: FormatOptions = {
  format: "international",
  countryCode: "DE",
  autoDetect: true,
  strict: false,
};

const formatted: string = formatPhoneNumber("15123456789", options);
const info: PhoneNumberInfo = getPhoneNumberInfo("447700900123");
const country: CountryInfo | null = phoneUtils.getCountryByISO2("US");
```

## Performance

The library is optimized for high-performance applications:

- **Fast Lookups** - O(1) average time complexity for most operations
- **Memory Efficient** - Optimized data structures
- **Minimal Dependencies** - No external dependencies
- **Benchmarks** - Handles 1000+ operations per second

```javascript
// Performance test example
console.time("1000 lookups");
for (let i = 0; i < 1000; i++) {
  phoneUtils.getCountryByDialCode("+1");
  formatPhoneNumber("2128691246");
  isValidPhoneNumber("447700900123");
}
console.timeEnd("1000 lookups");
// Typically < 100ms
```

## Migration from v0.x

If upgrading from the basic version:

```javascript
// Old way
const { formatPhoneNumber } = require("phone-number-formatter");
formatPhoneNumber("2128691246");

// New way (backward compatible)
const { formatPhoneNumber } = require("phone-forge");
formatPhoneNumber("2128691246"); // Same result

// New features
const info = getPhoneNumberInfo("2128691246");
const country = phoneUtils.getCountryByDialCode("+1");
```

## Browser Support

Works in all modern browsers and Node.js environments:

- **Node.js** - v12.0.0+
- **Chrome** - v60+
- **Firefox** - v55+
- **Safari** - v12+
- **Edge** - v79+

## File Structure

```
phone-forge/
├── src/
│   ├── index.js              # Main library (backward compatible)
│   ├── enhanced-index.js     # Enhanced functionality
│   ├── phone-database.json   # Complete country database
│   ├── phone-utils.js        # Database utility functions
│   └── index.d.ts           # TypeScript definitions
├── test/
│   ├── index.test.js        # Basic tests
│   └── enhanced.test.js     # Enhanced feature tests
├── package.json
└── README.md
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/easyware-io/phone-forge.git
cd phone-forge
npm install
npm test
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
node test/enhanced.test.js
```

## Roadmap

- 🔄 **Regular Updates** - Monthly database updates
- 📱 **Mobile Validation** - Enhanced mobile vs. landline detection
- 🌐 **Localization** - Country names in multiple languages
- 🏢 **Carrier Info** - Mobile carrier detection
- 📞 **Number Types** - Distinguish mobile, landline, toll-free
- 🔗 **Plugins** - Extensible plugin system

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📖 **Documentation** - Comprehensive guides and examples
- 🐛 **Bug Reports** - [GitHub Issues](https://github.com/easyware-io/phone-forge/issues)
- 💬 **Discussions** - [GitHub Discussions](https://github.com/easyware-io/phone-forge/discussions)
- 📧 **Email** - support@easyware.io

## Acknowledgments

- Country data sourced from ISO 3166 standards
- Dial codes based on ITU-T E.164 recommendations
- Flag emojis follow Unicode standards
- Built with performance and developer experience in mind

---

**Phone Forge** - Making international phone number handling simple and reliable. 🌍📱
