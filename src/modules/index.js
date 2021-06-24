import { mergeSchemas } from "@graphql-tools/merge";
import sampleSchema from "./sample";
import eventSchema from "./event";

// merge all of them into one
export default mergeSchemas({
  schemas: [
    sampleSchema,
    eventSchema,
    // add more here
  ],
});
