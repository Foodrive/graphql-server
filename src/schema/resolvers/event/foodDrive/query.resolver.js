import { EventType } from "../../../../utils/constants";

const Query = {
  getFoodDrives: async (_, args, context) => {
    const query = { type: EventType.foodDrive };
    if (args.userId) {
      query.organiserId = args.userId;
    }

    const { data } = await context.database.events.find(query);
    // Sort from earliest to latest
    data.sort((a, b) => b.startDate.localeCompare(a.startDate));
    return data;
  },

  getFoodDriveById: async (_, args, context) => {
    const { data } = await context.database.events.getById(args.eventId);
    // Sort from earliest to latest
    data.sort((a, b) => b.startDate.localeCompare(a.startDate));
    return data;
  },
};

export default {
  Query,
};
