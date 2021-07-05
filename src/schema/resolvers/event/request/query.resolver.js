import { EventType } from "utils/constants";

const Query = {
  getRequestsByLocation: async (_, args, context) => {
    const { data } = await context.database.requests.find(
      args.location
        ? {
          organiserId: args.location,
          type: EventType.foodDrive,
        }
        : {
          type: EventType.foodDrive,
        }
    );
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
