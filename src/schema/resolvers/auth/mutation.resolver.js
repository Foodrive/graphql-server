import { UserInputError } from "apollo-server";
import { hash, createToken } from "../../../utils/auth";

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

  const token = createToken({ userId: user.id });
  return {
    token,
    user,
  };
};

const login = async () => {};

const logout = async () => {};

const Mutation = {
  signup,
  logout,
  login,
};

export default {
  Mutation,
};
