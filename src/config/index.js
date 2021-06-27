export const tokenSecret = process.env.TOKEN_SECRET ?? "CHANGE_ME";
export const defaultLoggingLevel = process.env.LOG_LEVEL ?? "info";

export const cloudant = {
  dbName: "foodspot-db",
  cloudantId: process.env.CLOUDANT_ID || "", // username
  apiToken: process.env.CLOUDANT_API_TOKEN || "", // apiKey
};
