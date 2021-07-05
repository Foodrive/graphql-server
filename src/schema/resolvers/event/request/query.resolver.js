const Query = {
  getRequestsByLocation: async (_, args, context) => {
    const { data } = await context.database.requests.find({
      location: args.location,
    });
    return data;
  },
  getRequestsByRequestor: async (_, args, context) => {
    const { data } = await context.database.requests.getById(args.requestor);
    return data;
  },
};

export default {
  Query,
};
