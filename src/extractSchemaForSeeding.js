/**
 * Extracts the required fields from a Mongoose model or schema.
 * @param {object} modelOrSchema - A Mongoose model or schema.
 * @param {string} outputFormat - The format of the output array. Can be 'names' (default) or 'objects'.
 * @returns {Array} An array of required fields.
 */
const extractRequiredFields = (modelOrSchema, outputFormat = 'names') => {
  const modelSchema = modelOrSchema.schema ? modelOrSchema.schema : modelOrSchema;
  const pathsInSchema = modelSchema.paths;
  const requiredFields = [];

  for (const fieldName of Object.keys(pathsInSchema)) {
    const pathName = pathsInSchema[fieldName].options.alias
      ? pathsInSchema[fieldName].options.alias
      : fieldName;

    if (pathsInSchema[fieldName].options.required) {
      if (outputFormat === 'names') {
        requiredFields.push(pathName);
      }

      if (outputFormat === 'objects') {
        requiredFields.push({
          [pathName]: pathsInSchema[fieldName].instance,
        });
      }
    }
  }
  return requiredFields;
};

module.exports = extractRequiredFields;
