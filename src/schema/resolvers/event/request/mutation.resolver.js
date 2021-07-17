import { AuthenticationError, ValidationError } from "apollo-server-errors";

const createRequest = async (_, args, context) => {
  if (!context.userId) {
    throw new AuthenticationError("Not authenticated.");
  }

  // validate that requestorId exists
  const { data: users } = await context.database.users.find({
    id: args.requestorId,
  });

  if (users.length === 0) {
    throw new ValidationError("RequestorId does not exist.");
  }

  const newRequest = {
    requestor: args.requestorId,
    location: args.location,
    numAttendees: args.numAttendees,
    food: args.food,
  };
  const { data } = await context.database.requests.create(newRequest);
  return data;
};

const updateRequest = async (_, args, context) => {
  if (!context.userId) {
    throw new AuthenticationError("Not authenticated.");
  }

  const updatedRequest = {
    location: args.location,
    numAttendees: args.numAttendees,
    food: args.food,
  };

  const { data } = await context.database.requests.update(
    args.requestId,
    updatedRequest
  );
  return data;
};

const deleteRequest = async (_, args, context) => {
  if (!context.userId) {
    throw new AuthenticationError("Not authenticated.");
  }

  const { data } = await context.database.requests.delete(args.requestId);
  return data;
};

const Mutation = {
  createRequest,
  updateRequest,
  deleteRequest,
};

export default {
  Mutation,
};
