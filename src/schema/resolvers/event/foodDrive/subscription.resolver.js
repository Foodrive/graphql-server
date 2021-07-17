import pubsub from "../../../../utils/pubsub";
import { eventTriggers } from "../../../../utils/pubSubTriggers";

const foodDriveCreated = {
  subscribe: () => pubsub.asyncIterator([eventTriggers.foodDriveCreated]),
};

const foodDriveDeleted = {
  subscribe: () => pubsub.asyncIterator([eventTriggers.foodDriveDeleted]),
};

const foodDriveUpdated = {
  subscribe: () => pubsub.asyncIterator([eventTriggers.foodDriveUpdated]),
};

const Subscription = {
  foodDriveCreated,
  foodDriveDeleted,
  foodDriveUpdated,
};

export default {
  Subscription,
};
