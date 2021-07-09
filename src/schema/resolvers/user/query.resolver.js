import { ApolloError } from "apollo-server-errors";

const getUser = async (__, args, context) => {
  const { data: users } = await context.database.users.find({
    username: args.username,
  });

  const user = users[0];

  if (!user) {
    throw new ApolloError("User does not exist");
  } else {
    return user;
  }
};

const Query = {
  getUser,
};

export default {
  Query,
};
