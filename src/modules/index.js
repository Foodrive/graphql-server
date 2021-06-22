import { mergeSchemas } from "@graphql-tools/merge";
import sampleSchema from "./sample";

// merge all of them into one
export default mergeSchemas({
  schemas: [
    sampleSchema,
    // add more here
  ],
});
