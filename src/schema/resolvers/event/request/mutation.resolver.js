const createRequest = async (_, args, context) => {
  const newRequest = {
    requestor: args.requestor,
    location: args.location,
    numAttendees: args.numAttendees,
    food: args.food,
  };
  const { data } = await context.database.requests.create(newRequest);
  return data;
};

const updateRequest = async (_, args, context) => {
  const updatedRequest = {
    requestor: args.requestor,
    location: args.location,
    numAttendees: args.numAttendees,
    food: args.food,
  };
  const { data } = await context.database.requests.update(
    args.id,
    updatedRequest
  );
  return data;
};

const deleteRequest = async (_, args, context) => {
  const { data } = await context.database.requests.delete(args.id);
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
