import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";

const resolvers = loadFilesSync(path.join(__dirname, "./**/*.resolver.*"));

export default mergeResolvers(resolvers);
