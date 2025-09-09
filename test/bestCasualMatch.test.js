const assert = require('assert');
const { findCasualMatch } = require('../src/bestCasualMatch');

// Test suite for findCasualMatch
console.log('Running tests for findCasualMatch...');

// Test 1: Test with a key that has a good match
const firstName = findCasualMatch('firstName');
assert.strictEqual(typeof firstName, 'string');
console.log('Test 1 passed');

// Test 2: Test with a key that has a partial match
const name = findCasualMatch('name');
assert.strictEqual(typeof name, 'string');
console.log('Test 2 passed');

// Test 3: Test with a key that has no match
const noMatch = findCasualMatch('nonExistentKey');
assert.strictEqual(noMatch, undefined);
console.log('Test 3 passed');

// Test 4: Test with a camelCase key
const city = findCasualMatch('userCity');
assert.strictEqual(typeof city, 'string');
console.log('Test 4 passed');

// Test 5: Test with a key with special characters
const email = findCasualMatch('user_email-address');
assert.strictEqual(typeof email, 'string');
console.log('Test 5 passed');

console.log('All tests for findCasualMatch passed!');