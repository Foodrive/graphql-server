import { UserInputError, AuthenticationError } from "apollo-server";
import { hash, createToken, isValid } from "../../../utils/auth";

const signup = async (parent, args, context) => {
  // validate that all usernames are unique
  const { data: allUsers } = await context.database.users.getAll();

  if (allUsers.find((user) => user.username === args.username)) {
    throw new UserInputError("Username already exists.");
  }

  const password = await hash(args.password);
  const payload = {
    username: args.username,
    password,
    firstName: args.firstName,
    lastName: args.lastName,
    phoneNumber: "",
    email: "",
    allergies: [],
  };
  const { data: user } = await context.database.users.create(payload, true);

  const accessToken = createToken({ userId: user.id });
  return {
    accessToken,
    user,
  };
};

const login = async (parent, args, context) => {
  const { data: users } = await context.database.users.find({
    username: args.username,
  });
  const user = users[0];

  if (!user) {
    throw new AuthenticationError("No such user found.");
  }

  const valid = await isValid(args.password, user.password);

  if (!valid) {
    throw new AuthenticationError("Invalid password");
  }

  const accessToken = createToken({ userId: user.id });

  return {
    accessToken,
    user,
  };
};

const Mutation = {
  signup,
  login,
};

export default {
  Mutation,
};
