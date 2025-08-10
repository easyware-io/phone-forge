const {
  formatPhoneNumber,
  isValidPhoneNumber,
  extractDigits,
  getPhoneNumberInfo,
  phoneUtils,
} = require("../src/index.js");

// Simple test runner
function test(description, testFn) {
  try {
    testFn();
    console.log(`✓ ${description}`);
  } catch (error) {
    console.log(`✗ ${description}`);
    console.log(`  Error: ${error.message}`);
    process.exitCode = 1;
  }
}

function assertEqual(actual, expected, message = "") {
  if (actual !== expected) {
    throw new Error(`Expected "${expected}" but got "${actual}". ${message}`);
  }
}

function assertThrows(fn, expectedMessage = "") {
  try {
    fn();
    throw new Error("Expected function to throw an error");
  } catch (error) {
    if (expectedMessage && !error.message.includes(expectedMessage)) {
      throw new Error(
        `Expected error message to contain "${expectedMessage}" but got "${error.message}"`
      );
    }
  }
}

function assertTrue(condition, message = "") {
  if (!condition) {
    throw new Error(`Expected condition to be true. ${message}`);
  }
}

function assertFalse(condition, message = "") {
  if (condition) {
    throw new Error(`Expected condition to be false. ${message}`);
  }
}

// Run tests
console.log("Running enhanced phone number formatter tests...\n");

// === Original functionality tests ===
console.log("=== Testing Original Functionality ===");

test("formats 10-digit US number", () => {
  assertEqual(formatPhoneNumber("2128691246"), "+1 (212) 869-1246");
});

test("formats 11-digit US number", () => {
  assertEqual(formatPhoneNumber("12128691246"), "+1 (212) 869-1246");
});

test("formats 7-digit local number", () => {
  assertEqual(formatPhoneNumber("8691246"), "869-1246");
});

test("handles number with existing formatting", () => {
  assertEqual(formatPhoneNumber("(212) 869-1246"), "+1 (212) 869-1246");
});

test("handles international format", () => {
  assertEqual(
    formatPhoneNumber("2128691246", {
      format: "international",
      countryCode: "1",
    }),
    "+1 2128691246"
  );
});

// === Phone Database Tests ===
console.log("\n=== Testing Phone Database Utilities ===");

test("gets country by dial code", () => {
  const country = phoneUtils.getCountryByDialCode("+49");
  assertEqual(country.name, "Germany");
  assertEqual(country.iso2, "DE");
});

test("gets country by ISO2", () => {
  const country = phoneUtils.getCountryByISO2("US");
  assertEqual(country.name, "United States");
  assertEqual(country.dialCode, "+1");
});

test("gets country by ISO3", () => {
  const country = phoneUtils.getCountryByISO3("DEU");
  assertEqual(country.name, "Germany");
  assertEqual(country.dialCode, "+49");
});

test("gets country by name", () => {
  const country = phoneUtils.getCountryByName("United Kingdom");
  assertEqual(country.iso2, "GB");
  assertEqual(country.dialCode, "+44");
});

test("detects country from phone number", () => {
  const detected = phoneUtils.detectCountryFromPhoneNumber("4915123456789");
  assertTrue(detected.length > 0);
  assertEqual(detected[0].dialCode, "+49");
});

test("gets all countries by dial code +1", () => {
  const countries = phoneUtils.getCountriesByDialCode("+1");
  assertTrue(countries.length > 1); // US, Canada, and territories
  assertTrue(countries.some((c) => c.name === "United States"));
  assertTrue(countries.some((c) => c.name === "Canada"));
});

// === Enhanced Formatting Tests ===
console.log("\n=== Testing Enhanced Formatting ===");

test("formats German number with country code", () => {
  assertEqual(
    formatPhoneNumber("15123456789", {
      format: "international",
      countryCode: "DE",
    }),
    "+49 15123456789"
  );
});

test("formats UK number with auto-detection", () => {
  const result = formatPhoneNumber("447700900123", {
    format: "international",
    autoDetect: true,
  });
  assertEqual(result, "+44 7700900123");
});

test("formats number in E164 format", () => {
  assertEqual(
    formatPhoneNumber("2128691246", {
      format: "e164",
      countryCode: "US",
    }),
    "+12128691246"
  );
});

test("formats number in national format", () => {
  assertEqual(
    formatPhoneNumber("12128691246", {
      format: "national",
      countryCode: "US",
    }),
    "(212) 869-1246"
  );
});

// === Enhanced Validation Tests ===
console.log("\n=== Testing Enhanced Validation ===");

test("validates US number with country code", () => {
  assertTrue(isValidPhoneNumber("(212) 869-1246", { countryCode: "US" }));
});

test("validates international number in strict mode", () => {
  assertTrue(isValidPhoneNumber("447700900123", { strict: true }));
});

test("rejects invalid number in strict mode", () => {
  assertFalse(isValidPhoneNumber("123", { strict: true }));
});

test("validates various international formats", () => {
  assertTrue(isValidPhoneNumber("+49 151 23456789"));
  assertTrue(isValidPhoneNumber("+33 1 42 86 83 26"));
  assertTrue(isValidPhoneNumber("+86 138 0013 8000"));
});

// === Phone Number Info Tests ===
console.log("\n=== Testing Phone Number Info ===");

test("gets comprehensive phone number info", () => {
  const info = getPhoneNumberInfo("447700900123");
  assertTrue(info.valid);
  assertEqual(info.digits, "447700900123");
  assertTrue(info.possibleCountries.length > 0);
  assertEqual(info.possibleCountries[0].dialCode, "+44");
  assertTrue(info.formats !== null);
});

test("handles invalid phone number info", () => {
  const info = getPhoneNumberInfo("");
  assertFalse(info.valid);
  assertTrue(info.error.includes("required"));
});

test("provides multiple format options", () => {
  const info = getPhoneNumberInfo("12128691246");
  assertTrue(info.formats !== null);
  assertEqual(info.formats.e164, "+12128691246");
  assertTrue(info.formats.international.includes("+1"));
});

// === Error Handling Tests ===
console.log("\n=== Testing Enhanced Error Handling ===");

test("throws error for unknown country code", () => {
  assertThrows(
    () => formatPhoneNumber("123456789", { countryCode: "XX" }),
    "Unknown country code"
  );
});

test("throws error for international format without country", () => {
  assertThrows(
    () => formatPhoneNumber("123456789", { format: "international" }),
    "Cannot format as international without country information"
  );
});

test("throws error for E164 format without country", () => {
  assertThrows(
    () => formatPhoneNumber("123456789", { format: "e164" }),
    "Cannot format as E.164 without country information"
  );
});

// === Database Statistics Tests ===
console.log("\n=== Testing Database Statistics ===");

test("gets database statistics", () => {
  const stats = phoneUtils.getDatabaseStats();
  assertTrue(stats.totalCountries > 200);
  assertTrue(stats.totalDialCodes > 0);
  assertTrue(stats.version === "1.0.0");
  assertTrue(stats.shortestDialCode.length >= 2); // At least "+1"
  assertTrue(stats.longestDialCode.length <= 6); // Max around "+1XXX"
});

test("validates dial codes", () => {
  assertTrue(phoneUtils.isValidDialCode("+1"));
  assertTrue(phoneUtils.isValidDialCode("49"));
  assertFalse(phoneUtils.isValidDialCode("+999999"));
});

test("gets all dial codes", () => {
  const codes = phoneUtils.getAllDialCodes();
  assertTrue(codes.length > 0);
  assertTrue(codes.includes("+1"));
  assertTrue(codes.includes("+49"));
  assertTrue(codes.includes("+44"));
});

// === Search Functionality Tests ===
console.log("\n=== Testing Search Functionality ===");

test("searches countries by multiple criteria", () => {
  const results = phoneUtils.searchCountries({
    name: "United",
    dialCode: "+1",
  });
  assertTrue(results.length > 0);
  assertTrue(results.some((c) => c.name === "United States"));
});

test("searches countries by partial name", () => {
  const results = phoneUtils.searchCountries({ name: "German" });
  assertTrue(results.length > 0);
  assertEqual(results[0].name, "Germany");
});

console.log("\n=== Performance Tests ===");

test("handles large number of lookups efficiently", () => {
  const start = Date.now();
  for (let i = 0; i < 1000; i++) {
    phoneUtils.getCountryByDialCode("+1");
    phoneUtils.getCountryByISO2("US");
    phoneUtils.detectCountryFromPhoneNumber("12128691246");
  }
  const duration = Date.now() - start;
  assertTrue(
    duration < 1000,
    `Performance test took ${duration}ms, expected < 1000ms`
  );
});

console.log("\nAll enhanced tests completed!");
console.log(
  `\nDatabase contains ${
    phoneUtils.getDatabaseStats().totalCountries
  } countries with ${
    phoneUtils.getDatabaseStats().totalDialCodes
  } unique dial codes.`
);
