import { eventTriggers } from "utils/pubSubTriggers";

const foodDriveCreated = {
  subscribe: (_, __, context) =>
    context.pubsub.asyncIterator(eventTriggers.foodDriveCreated),
};

const foodDriveDeleted = {
  subscribe: (_, __, context) =>
    context.pubsub.asyncIterator(eventTriggers.foodDriveDeleted),
};

const foodDriveUpdated = {
  subscribe: (_, __, context) =>
    context.pubsub.asyncIterator(eventTriggers.foodDriveUpdated),
};

const Subscription = {
  foodDriveCreated,
  foodDriveDeleted,
  foodDriveUpdated,
};

export default {
  Subscription,
};
