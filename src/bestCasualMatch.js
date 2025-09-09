const Fuse = require("fuse.js");
const casual = require("casual");

// Step 1: Get all available method names from the casual library.
const casualMethods = Object.keys(casual).filter(
  (x) => typeof casual[x] === "function"
);

// Step 2: Configure Fuse.js for fuzzy searching.
const fuse = new Fuse(casualMethods, {
  includeScore: true,
  // A lower threshold means a stricter match is required.
  threshold: 0.6,
});

/**
 * Normalizes a schema key for better matching.
 * Converts camelCase to snake_case, replaces symbols with underscores, and converts to lower case.
 * @param {string} key - The schema key to normalize.
 * @returns {string} The normalized key.
 */
function normalizeKey(key) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .toLowerCase();
}

/**
 * Finds the best casual match for a given schema key.
 * @param {string} schemaKey - The schema key to find a match for.
 * @returns {any} The generated casual data or undefined if no match is found.
 */
function findCasualMatch(schemaKey) {
  const normalized = normalizeKey(schemaKey);
  const results = fuse.search(normalized);

  if (results.length > 0) {
    // Return the result of the best match.
    return casual[results[0].item]();
  }
}

module.exports = { findCasualMatch };