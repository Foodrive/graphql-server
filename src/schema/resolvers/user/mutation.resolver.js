import { ApolloError } from "apollo-server-errors";
import { hash } from "utils/auth";

const updateUser = async (__, args, context) => {
  const password = await hash(args.password);

  const { data: result } = await context.database.users.update(context.userId, {
    username: args.username,
    password,
    phoneNumber: args.phoneNumber,
    email: args.email,
    allergies: args.allergies,
  });

  if (!result) {
    throw new ApolloError("User update failed");
  } else {
    return result;
  }
};

const deleteUser = async (__, args, context) => {
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
