const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../config");

/**
 * Provides an encrypted hash of the value passed
 * @param {string} value
 * @return {Promise<string>}
 */
exports.hash = async (value) => {
  return await bcrypt.hash(value, 10);
};

/**
 * Compares two values and returns whether the two hashes match
 * @param {string} value1
 * @param {string} value2
 * @returns {Promise<boolean>}
 */
exports.isValid = async (value1, value2) => {
  return await bcrypt.compare(value1, value2);
};

/**
 * Creates a signed JWT token
 * @param {Object} payload
 * @returns {String}
 */
exports.createToken = (payload) => {
  return jwt.sign(JSON.stringify(payload), tokenSecret);
};

/**
 * Retrieves the payload of the JWT token
 * @param {String} token
 * @returns {Object}
 */
exports.getTokenPayload = (token) => {
  return jwt.verify(token, tokenSecret);
};
