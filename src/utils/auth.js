import { AuthenticationError } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { tokenSecret } from "../config";

/**
 * Provides an encrypted hash of the value passed
 * @param {string} value
 * @return {Promise<string>}
 */
export const hash = async (value) => bcrypt.hash(value, 10);

/**
 * Compares two values and returns whether the two hashes match
 * @param {string} value1
 * @param {string} value2
 * @returns {Promise<boolean>}
 */
export const isValid = async (value1, value2) => bcrypt.compare(value1, value2);

/**
 * Creates a signed JWT token
 * @param {Object} payload
 * @returns {String}
 */
export const createToken = (payload) =>
  jwt.sign(JSON.stringify(payload), tokenSecret);

/**
 * Retrieves the payload of the JWT token
 * @param {String} token
 * @returns {Object}
 */
export const getTokenPayload = (token) => jwt.verify(token, tokenSecret);

/**
 * Retrieves the userId from the token
 * @param req
 * @param authToken
 * @returns {*}
 */
export const getUserId = (req, authToken) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new AuthenticationError("No token found");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new AuthenticationError("Not authenticated");
};
