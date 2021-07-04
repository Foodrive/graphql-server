const Query = {
  getFoodDrives: async (_, __, context) => {
    const { data } = await context.database.events.find({ type: "FOODDRIVE" });
    return data;
  },
  getFoodDriveById: async (_, args, context) => {
    const { data } = await context.database.events.getById(args.eventId);
    return data;
  },
};

export default {
  Query,
};
