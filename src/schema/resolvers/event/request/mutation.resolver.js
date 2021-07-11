import { AuthenticationError } from "apollo-server";

const createRequest = async (_, args, context) => {
  if (!context.userId) {
    throw new AuthenticationError("Not authenticated.");
  }

  // validate that requestorId exists

  const newRequest = {
    requestorId: args.requestorId,
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
