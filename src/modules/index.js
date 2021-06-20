const { mergeSchemas } = require("@graphql-tools/merge");

// Require schema modules here
const sampleSchema = require("./sample");

// merge all of them into one
module.exports = mergeSchemas({
  schemas: [
    sampleSchema,
    // add more here
  ],
});
