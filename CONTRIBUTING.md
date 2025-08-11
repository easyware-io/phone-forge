# Contributing to Phone Forge

Thank you for your interest in contributing to Phone Forge! We welcome contributions from developers of all skill levels. This guide will help you get started with contributing to our comprehensive phone number formatting and validation library.

## 🎯 How to Contribute

There are many ways you can contribute to Phone Forge:

- **Report bugs** - Help us identify and fix issues
- **Suggest features** - Propose new functionality or improvements
- **Improve documentation** - Help make our docs clearer and more comprehensive
- **Submit code** - Fix bugs, implement features, or optimize performance
- **Update country data** - Help keep our international database current
- **Write tests** - Improve our test coverage
- **Performance optimization** - Help make the library faster and more efficient

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v12.0.0 or higher)
- **Git** for version control
- A **GitHub account**
- Basic knowledge of **JavaScript/TypeScript**

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/phone-forge.git
   cd phone-forge
   ```

3. **Install dependencies** (Phone Forge has no external dependencies, but you might need dev tools):

   ```bash
   npm install
   ```

4. **Run tests** to ensure everything works:

   ```bash
   npm test
   ```

5. **Create a new branch** for your contribution:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

## 📁 Project Structure

Understanding the project structure will help you contribute effectively:

```
phone-forge/
├── src/
│   ├── index.js              # Main library entry point
│   ├── phone-utils.js        # Database utility functions
│   ├── phone-database.json   # International country database
│   └── index.d.ts           # TypeScript definitions
├── test/
│   └── index.test.js        # Comprehensive test suite
├── README.md                # Main documentation
├── CONTRIBUTING.md          # This file
├── package.json             # Package configuration
└── .gitignore              # Git ignore rules
```

### Key Components

- **`src/index.js`** - Core formatting and validation functions
- **`src/phone-utils.js`** - Country database operations and utilities
- **`src/phone-database.json`** - Complete international phone database
- **`src/index.d.ts`** - TypeScript type definitions
- **`test/index.test.js`** - All tests for the library

## 🐛 Reporting Bugs

Before reporting a bug, please:

1. **Check existing issues** to avoid duplicates
2. **Test with the latest version** of Phone Forge
3. **Provide a minimal reproduction case**

### Bug Report Template

````markdown
**Bug Description**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Call function '...'
2. With parameters '...'
3. Expected result '...'
4. Actual result '...'

**Code Example**

```javascript
const { formatPhoneNumber } = require("phone-forge");
const result = formatPhoneNumber("your-test-case");
console.log(result); // Unexpected output
```
````

**Environment**

- Phone Forge version: [e.g., 1.0.0]
- Node.js version: [e.g., 18.0.0]
- Operating System: [e.g., Windows 10, macOS 12, Ubuntu 20.04]

**Additional Context**
Any other context about the problem.

````

## 💡 Suggesting Features

We love feature suggestions! Before submitting:

1. **Check if it already exists** in issues or discussions
2. **Consider the scope** - Does it fit Phone Forge's mission?
3. **Think about backward compatibility**

### Feature Request Template

```markdown
**Feature Description**
A clear description of what you want to happen.

**Use Case**
Describe the specific use case this feature would address.

**Proposed API**
```javascript
// How would you like to use this feature?
const result = newFunction(parameters);
````

**Alternatives Considered**
Describe any alternative solutions you've considered.

**Additional Context**
Any other context, mockups, or examples.

````

## 🔧 Code Contributions

### Development Workflow

1. **Create an issue** first (for larger changes) to discuss the approach
2. **Fork and clone** the repository
3. **Create a feature branch** from `main`
4. **Make your changes** following our coding standards
5. **Add or update tests** for your changes
6. **Update documentation** if needed
7. **Run the test suite** to ensure everything passes
8. **Commit your changes** with clear, descriptive messages
9. **Push to your fork** and create a pull request

### Coding Standards

#### JavaScript Style
- Use **ES6+ features** where appropriate
- Follow **consistent indentation** (2 spaces)
- Use **meaningful variable names**
- Include **JSDoc comments** for public functions
- Handle **edge cases** gracefully

#### Example of Good Code Style:
```javascript
/**
 * Format phone number with country-specific rules
 * @param {string} phoneNumber - The phone number to format
 * @param {Object} options - Formatting options
 * @param {string} options.countryCode - ISO2 country code
 * @returns {string} Formatted phone number
 */
function formatPhoneNumberForCountry(phoneNumber, options = {}) {
  if (!phoneNumber) {
    throw new Error("Phone number is required");
  }

  const { countryCode } = options;
  const digits = phoneNumber.replace(/\D/g, "");

  // Implementation...
  return formattedNumber;
}
````

#### Testing Standards

- **Write tests** for all new functionality
- **Test edge cases** and error conditions
- **Use descriptive test names**
- **Follow the existing test pattern**

#### Example Test:

```javascript
test("formats German mobile number correctly", () => {
  const result = formatPhoneNumber("15123456789", {
    format: "international",
    countryCode: "DE",
  });
  assertEqual(result, "+49 15123456789");
});

test("throws error for invalid country code", () => {
  assertThrows(
    () => formatPhoneNumber("123456789", { countryCode: "INVALID" }),
    "Unknown country code"
  );
});
```

### Database Contributions

Our phone database is a critical component. When contributing:

#### Country Data Updates

- **Verify information** with official sources
- **Follow the existing JSON structure** exactly
- **Include all required fields**: name, iso2, iso3, dialCode, flag
- **Test thoroughly** after database changes

#### Database Schema:

```json
{
  "name": "Country Name",
  "iso2": "XX",
  "iso3": "XXX",
  "dialCode": "+XXX",
  "flag": "🏳️"
}
```

#### Sources for Country Data:

- **ISO 3166** for country codes
- **ITU-T E.164** for international dial codes
- **Unicode** for flag emojis
- **Official government sources** for country names

### TypeScript Definitions

When adding new features:

1. **Update `index.d.ts`** with proper type definitions
2. **Ensure type accuracy** - types should match implementation
3. **Add JSDoc comments** to interfaces
4. **Test TypeScript compatibility**

#### Example TypeScript Addition:

```typescript
export interface NewFeatureOptions {
  /** Enable advanced validation */
  strict?: boolean;
  /** Custom format pattern */
  pattern?: string;
}

export function newFeature(input: string, options?: NewFeatureOptions): string;
```

## 🧪 Testing Guidelines

### Running Tests

```bash
# Run all tests
npm test

# Run tests with verbose output
node test/index.test.js

# Test specific functionality manually
node -e "
const pf = require('./src/index.js');
console.log(pf.formatPhoneNumber('2128691246'));
"
```

### Test Categories

We organize tests into categories:

1. **Original Functionality** - Basic phone formatting
2. **Database Utilities** - Country lookup functions
3. **Enhanced Formatting** - Advanced formatting options
4. **Validation** - Phone number validation
5. **Error Handling** - Error conditions and edge cases
6. **Performance** - Speed and efficiency tests

### Writing New Tests

When adding tests:

```javascript
// Use descriptive test names
test("validates UK mobile numbers in strict mode", () => {
  assertTrue(isValidPhoneNumber("447700900123", { strict: true }));
});

// Test both positive and negative cases
test("rejects invalid numbers in strict mode", () => {
  assertFalse(isValidPhoneNumber("123", { strict: true }));
});

// Test edge cases
test("handles empty input gracefully", () => {
  assertThrows(() => formatPhoneNumber(""), "Phone number is required");
});
```

## 📖 Documentation

### README Updates

When adding features:

- Add examples to the README
- Update the API documentation
- Include TypeScript examples
- Update the feature list

### Code Documentation

- Use **JSDoc comments** for all public functions
- Include **parameter descriptions** and **return types**
- Provide **usage examples** in comments
- Document **error conditions**

### Example Documentation:

```javascript
/**
 * Detect possible countries from a phone number
 * @param {string} phoneNumber - Phone number to analyze
 * @returns {Array<DetectedCountry>} Array of possible country matches
 * @throws {Error} When phone number is empty or invalid
 *
 * @example
 * const countries = detectCountryFromPhoneNumber("4915123456789");
 * console.log(countries[0].countries[0].name); // "Germany"
 */
function detectCountryFromPhoneNumber(phoneNumber) {
  // Implementation...
}
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update the branch** with latest main
2. **Run all tests** and ensure they pass
3. **Update documentation** if needed
4. **Check TypeScript definitions** are current
5. **Test your changes** thoroughly

### Pull Request Template

```markdown
## Description

Brief description of changes made.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Database update

## Testing

- [ ] Tests added/updated for new functionality
- [ ] All existing tests pass
- [ ] Manual testing completed

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] TypeScript definitions updated (if applicable)

## Additional Notes

Any additional information about the PR.
```

### Review Process

1. **Automated tests** will run on your PR
2. **Maintainers will review** your code
3. **Address feedback** promptly and professionally
4. **Make requested changes** in new commits
5. **Squash commits** may be requested before merge

## 🏆 Recognition

Contributors will be recognized in:

- **README.md** contributor section
- **Release notes** for significant contributions
- **GitHub contributor graphs**
- **Special mention** for major improvements

## 📞 Getting Help

If you need help:

1. **Check existing documentation** first
2. **Search closed issues** for similar problems
3. **Create a discussion** for general questions
4. **Join our community** discussions on GitHub

### Contact Options

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Email** - support@easyware.io for private matters

## 📋 Development Checklist

Before submitting your contribution:

### Code Quality

- [ ] Code follows project conventions
- [ ] Functions are properly documented
- [ ] Error handling is comprehensive
- [ ] Edge cases are handled

### Testing

- [ ] New tests added for new functionality
- [ ] All existing tests pass
- [ ] Error conditions are tested
- [ ] Performance impact is acceptable

### Documentation

- [ ] README updated if needed
- [ ] Code comments are clear and helpful
- [ ] TypeScript definitions updated
- [ ] Examples provided for new features

### Database Changes (if applicable)

- [ ] Data verified with official sources
- [ ] JSON structure is correct
- [ ] All required fields present
- [ ] Changes tested thoroughly

## 🎉 Thank You!

Your contributions help make Phone Forge better for developers worldwide. Whether you're fixing a typo, adding a feature, or updating country data, every contribution is valuable and appreciated.

We're committed to maintaining a welcoming, inclusive environment for all contributors. Please be respectful, constructive, and help us build an amazing tool for the JavaScript community!

---

**Happy coding!** 🚀📱

For questions about this contributing guide, please create an issue or start a discussion
