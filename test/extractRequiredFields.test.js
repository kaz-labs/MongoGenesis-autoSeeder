const assert = require('assert');
const extractRequiredFields = require('../src/extractSchemaForSeeding');
const { userModel, userSchema, productModel } = require('./test-models.js');

// Test suite for extractRequiredFields
console.log('Running tests for extractRequiredFields...');

// Test 1: Test with a Mongoose model
const requiredFieldsFromModel = extractRequiredFields(userModel);
assert.deepStrictEqual(requiredFieldsFromModel, ['username', 'fullname', 'role']);
console.log('Test 1 passed');

// Test 2: Test with a Mongoose schema
const requiredFieldsFromSchema = extractRequiredFields(userSchema);
assert.deepStrictEqual(requiredFieldsFromSchema, ['username', 'fullname', 'role']);
console.log('Test 2 passed');

// Test 3: Test with a schema that has aliases
const requiredFieldsFromProductModel = extractRequiredFields(productModel);
assert.deepStrictEqual(requiredFieldsFromProductModel, ["word", "integer", "state", "productCategory", "seller"]);
console.log('Test 3 passed');

// Test 4: Test with outputFormat = 'objects'
const requiredFieldsAsObjects = extractRequiredFields(userModel, 'objects');
assert.deepStrictEqual(requiredFieldsAsObjects, [{ username: 'String' }, { fullname: 'String' }, { role: 'String' }]);
console.log('Test 4 passed');

// Test 5: Test with a schema that has no required fields
const noRequiredFieldsSchema = { paths: { name: { options: {} } } };
const noRequiredFields = extractRequiredFields(noRequiredFieldsSchema);
assert.deepStrictEqual(noRequiredFields, []);
console.log('Test 5 passed');

console.log('All tests for extractRequiredFields passed!');
