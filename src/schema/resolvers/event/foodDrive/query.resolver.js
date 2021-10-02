import dayjs from "dayjs";
import { EventType } from "../../../../utils/constants";

const Query = {
  getFoodDrives: async (_, args, context) => {
    const now = dayjs().unix();
    const query = { type: EventType.foodDrive, startDate: { $gte: now } };

    if (args.userId) {
      query.organiserId = args.userId;
    }

    // Filters
    if (args.filter?.showAll) {
      delete query.startDate;
    }

    const { data } = await context.database.events.find(query);
    data.sort((a, b) => a.startDate - b.startDate);
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
