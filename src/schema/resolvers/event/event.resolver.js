import { EventType } from "utils/constants";

const Event = {
  __resolveType(event) {
    if (event.type === EventType.foodDrive) {
      return EventType.foodDrive;
    }
    return null;
  },
};

export default {
  Event,
};
