import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import sharedTypeDefs from "../../shared/typeDefs";

const types = loadFilesSync(path.join(__dirname, "./**/*.graphql"));

export default mergeTypeDefs([...types, ...sharedTypeDefs]);
