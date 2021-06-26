import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import locationType from "../../shared/typeDefs/location.graphql";

const types = loadFilesSync(path.join(__dirname, "./**/*.graphql"));

// add additional shared depedencies
types.push(locationType);

export default mergeTypeDefs(types);
