import { mergeSchemas } from "@graphql-tools/merge";
import eventSchema from "./event";

// merge all of them into one
export default mergeSchemas({
  schemas: [
    eventSchema,
    // add more here
  ],
});
