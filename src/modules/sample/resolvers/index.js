const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeResolvers } = require("@graphql-tools/merge");

const resolvers = loadFilesSync(path.join(__dirname, "./**/*.resolver.*"));

module.exports = mergeResolvers(resolvers);
