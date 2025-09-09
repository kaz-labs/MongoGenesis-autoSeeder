# Mongoose Seed Generator

A utility to generate seed data for Mongoose schemas.

## Installation

```bash
npm install mongoose-seed-generator
```

## Usage

```javascript
const { generateSeedData } = require('mongoose-seed-generator');
const mongoose = require('mongoose');

// Your Mongoose schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true }
});

const User = mongoose.model('User', userSchema);

// Generate seed data
// Note: Fields with `enum` properties are not automatically generated and should be set explicitly.
const seedData = generateSeedData(User, {
  customConfig: {
    role: 'admin'
  }
});

console.log(seedData);

// Generate seed data with custom values
const customData = generateSeedData(User, {
  customConfig: {
    name: 'John Doe',
    age: 30,
    role: 'user'
  }
});

console.log(customData);
```

## API

### `generateSeedData(modelInstance, [options])`

Generates seed data for a Mongoose model.

- `modelInstance`: Your Mongoose model instance.
- `options` (optional): An object with the following properties:
  - `customConfig`: An object where you can set custom values for specific properties. The keys of the object should correspond to the field names in your schema.

**Note:** Fields with `enum` properties are not automatically generated. You should set them explicitly using the `customConfig` option.

### `extractRequiredFields(modelOrSchema, [outputFormat])`

Extracts the required fields from a Mongoose model or schema.

- `modelOrSchema`: Your Mongoose model or schema.
- `outputFormat` (optional): The format of the output array. Can be `'names'` (default) or `'objects'`.

### `findCasualMatch(schemaKey)`

Finds the best casual match for a given schema key.

- `schemaKey`: The schema key to find a match for.

## Testing

```bash
npm test
```

## Future Improvements

- Add support for automatically generating values for fields with `enum` properties.
- Add a configuration option to choose between aliases and original path names when extracting fields.
- More robustly detect casual methods instead of relying on the `_` prefix.