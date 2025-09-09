const assert = require('assert');
const generateSeedData = require('../src/seed.generator');
const { userModel } = require('./test-models.js');

// Test suite for generateSeedData
console.log('Running tests for generateSeedData...');

// Test 1: Test with a Mongoose model
const seedData = generateSeedData(userModel);
assert.strictEqual(typeof seedData, 'object');
assert.ok(seedData.username);
assert.ok(seedData.fullname);
console.log('Test 1 passed');

// Test 2: Test with a customConfig object
const customData = generateSeedData(userModel, {
  customConfig: {
    username: 'testuser',
    role: 'admin'
  }
});
assert.strictEqual(customData.username, 'testuser');
assert.strictEqual(customData.role, 'admin');
assert.ok(customData.fullname);
console.log('Test 2 passed');

// Test 3: Test with an empty customConfig object
const seedDataWithEmptyConfig = generateSeedData(userModel, { customConfig: {} });
assert.strictEqual(typeof seedDataWithEmptyConfig, 'object');
assert.ok(seedDataWithEmptyConfig.username);
assert.ok(seedDataWithEmptyConfig.fullname);
console.log('Test 3 passed');

// Test 4: Test with a model that has no required fields
const noRequiredFieldsSchema = { schema: { paths: { name: { options: {} } } } };
const noRequiredSeedData = generateSeedData(noRequiredFieldsSchema);
assert.deepStrictEqual(noRequiredSeedData, {});
console.log('Test 4 passed');

console.log('All tests for generateSeedData passed!');