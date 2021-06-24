import { mergeSchemas } from "@graphql-tools/merge";
import sharedSchema from "./shared";
import eventSchema from "./event";

// merge all of them into one
export default mergeSchemas({
  schemas: [
    sharedSchema,
    eventSchema,
    // add more here
  ],
});
