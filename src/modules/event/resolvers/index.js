import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";
import locationResolver from "../../shared/resolvers/location.resolver";
import eventResolver from "../../shared/resolvers/event.resolver";

const resolvers = loadFilesSync(path.join(__dirname, "./**/*.resolver.*"));

// Add shared resolvers
resolvers.push(eventResolver);
resolvers.push(locationResolver);

export default mergeResolvers(resolvers);
