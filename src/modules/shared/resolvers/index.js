import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";

export default loadFilesSync(path.join(__dirname, "./**/*.resolver.*"));
