const extractRequiredFields = require("./extractSchemaForSeeding.js");
const { findCasualMatch } = require("./bestCasualMatch.js");

/**
 * Sets custom values for specified fields.
 * @param {object} customConfig - An object with field names as keys and custom values as values.
 * @returns {object} The custom configuration object.
 */
const setExplicitly = (customConfig) => {
  if (typeof customConfig === "object") {
    return { ...customConfig };
  }
  return {};
};

/**
 * Generates seed data for a Mongoose model.
 * @param {object} modelInstance - A Mongoose model instance.
 * @param {object} options - An options object.
 * @param {object} options.customConfig - An object with custom values for specific fields.
 * @returns {object} The generated seed data.
 */
module.exports = function generateSeedData(modelInstance, { customConfig } = {}) {
  let seedData = {};
  const explicitFields = setExplicitly(customConfig); // Get explicit fields first

  extractRequiredFields(modelInstance).forEach((field) => {
    if (explicitFields[field] !== undefined) { // If field is explicitly set, use it
      seedData[field] = explicitFields[field];
    } else { // Otherwise, try to generate
      seedData[field] = findCasualMatch(field.toString());
    }
  });

  // Any remaining explicit fields not in required fields should also be added
  // This handles cases where customConfig might have fields not marked as required
  Object.keys(explicitFields).forEach(field => {
    if (seedData[field] === undefined) { // Only add if not already set
      seedData[field] = explicitFields[field];
    }
  });

  return seedData;
}