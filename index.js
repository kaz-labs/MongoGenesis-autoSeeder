// This file is the entry point for the library.
// It exports the public API.

const { findCasualMatch } = require('./src/bestCasualMatch');
const extractRequiredFields = require('./src/extractSchemaForSeeding');
const generateSeedData = require('./src/seed.generator');

module.exports = {
  findCasualMatch,
  extractRequiredFields,
  generateSeedData
};