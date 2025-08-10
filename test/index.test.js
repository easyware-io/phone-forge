const {
  formatPhoneNumber,
  isValidPhoneNumber,
  extractDigits,
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

// Run tests
console.log("Running phone number formatter tests...\n");

// Basic formatting tests
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

test("handles different country code", () => {
  assertEqual(
    formatPhoneNumber("2128691246", {
      format: "international",
      countryCode: "44",
    }),
    "+44 2128691246"
  );
});

// Error handling tests
test("throws error for empty input", () => {
  assertThrows(() => formatPhoneNumber(""), "Phone number is required");
});

test("throws error for invalid 11-digit number", () => {
  assertThrows(
    () => formatPhoneNumber("22128691246"),
    "must start with country code 1"
  );
});

test("throws error for invalid length", () => {
  assertThrows(
    () => formatPhoneNumber("123"),
    "must be 7, 10, or 11 digits long"
  );
});

// Validation tests
test("validates correct phone number formats", () => {
  assertEqual(isValidPhoneNumber("(212) 869-1246"), true);
  assertEqual(isValidPhoneNumber("+1-212-869-1246"), true);
  assertEqual(isValidPhoneNumber("212.869.1246"), true);
  assertEqual(isValidPhoneNumber("abc"), false);
  assertEqual(isValidPhoneNumber(""), false);
});

// Utility tests
test("extracts digits correctly", () => {
  assertEqual(extractDigits("(212) 869-1246"), "2128691246");
  assertEqual(extractDigits("+1-212-869-1246"), "12128691246");
  assertEqual(extractDigits(""), "");
});

console.log("\nAll tests completed!");
