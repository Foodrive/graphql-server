import { EventType } from "utils/constants";

const Query = {
  getFoodDrives: async (_, args, context) => {
    const { data } = await context.database.events.find(
      args.userId
        ? {
            organiserId: args.userId,
            type: EventType.foodDrive,
          }
        : {
            type: EventType.foodDrive,
          }
    );
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
