import { AuthenticationError, ApolloError } from "apollo-server-errors";
import { hash } from "../../../utils/auth";

const updateUser = async (__, args, context) => {
  if (!context.userId) {
    throw new AuthenticationError("Not authenticated");
  }

  const password = args.password ? await hash(args.password) : undefined;
  const { data: result } = await context.database.users.update(context.userId, {
    password,
    phoneNumber: args.phoneNumber,
    email: args.email,
    allergies: args.allergies,
  });

  if (!result) {
    throw new ApolloError("User update failed");
  }

  return result;
};

const deleteUser = async (__, args, context) => {
  if (!context.userId) {
    throw new AuthenticationError("Not authenticated");
  }

  const { data: result } = await context.database.users.delete(args.id);

  if (!result) {
    throw new ApolloError("Unable to delete user, id does not exist");
  } else {
    return result;
  }
};

const Mutation = {
  updateUser,
  deleteUser,
};

export default {
  Mutation,
};
