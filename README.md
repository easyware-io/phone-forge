# Phone Number Formatter

A lightweight JavaScript library for formatting phone numbers into standardized formats.

## Installation

```bash
npm install phone-number-formatter
```

## Usage

```javascript
const {
  formatPhoneNumber,
  isValidPhoneNumber,
  extractDigits,
} = require("phone-number-formatter");

// Basic US formatting
formatPhoneNumber("2128691246");
// Returns: "+1 (212) 869-1246"

formatPhoneNumber("12128691246");
// Returns: "+1 (212) 869-1246"

// Local 7-digit formatting
formatPhoneNumber("8691246");
// Returns: "869-1246"

// International formatting
formatPhoneNumber("2128691246", { format: "international", countryCode: "44" });
// Returns: "+44 2128691246"

// Validation
isValidPhoneNumber("(212) 869-1246");
// Returns: true

// Extract digits only
extractDigits("(212) 869-1246");
// Returns: "2128691246"
```

## API

### formatPhoneNumber(phoneNumber, options?)

Formats a phone number string into a standardized format.

**Parameters:**

- `phoneNumber` (string): The phone number to format
- `options` (object, optional):
  - `format` (string): Format type - 'us' (default) or 'international'
  - `countryCode` (string): Country code for international format (default: '1')

**Returns:** Formatted phone number string

**Throws:** Error for invalid input

### isValidPhoneNumber(phoneNumber)

Validates if a phone number string contains valid characters.

**Parameters:**

- `phoneNumber` (string): Phone number to validate

**Returns:** Boolean indicating if the format is valid

### extractDigits(phoneNumber)

Extracts only the digits from a phone number string.

**Parameters:**

- `phoneNumber` (string): Phone number string

**Returns:** String containing only digits

## Supported Formats

- **US Format:** `+1 (XXX) XXX-XXXX`
- **Local Format:** `XXX-XXXX` (for 7-digit numbers)
- **International Format:** `+CC XXXXXXXXXX`

## Error Handling

The library throws descriptive errors for:

- Empty or null input
- Invalid number lengths
- Invalid country codes for 11-digit numbers
- Non-numeric input (after cleaning)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
