export const tokenSecret = process.env.TOKEN_SECRET ?? "CHANGE_ME";
export const defaultLoggingLevel = process.env.LOG_LEVEL ?? "info";

export const database = {
  url: process.env.cloudant_url || "",
  username: process.env.cloudant_username || "",
  password: process.env.cloudant_password || "",
};
