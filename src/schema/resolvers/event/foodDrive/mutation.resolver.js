import { eventTriggers } from "../../../../utils/pubSubTriggers";
import { EventType } from "../../../../utils/constants";

const createFoodDrive = async (_, args, context) => {
  const newFoodDrive = {
    name: args.name,
    description: args.description,
    startDate: args.startDate,
    endDate: args.endDate,
    type: EventType.foodDrive,
    location: args.location,
    organiserId: args.organiserId,
    contactNumber: args.contactNumber,
    email: args.email,
    maxCapacity: args.maxCapacity,
    autoAccept: args.autoAccept ?? true,
    isOpen: true,
    food: args.food,
  };
  const { data } = await context.database.events.create(newFoodDrive);
  context.pubsub.publish(eventTriggers.foodDriveCreated, {
    foodDriveCreated: data,
  });
  return data;
};

const updateFoodDrive = async (_, args, context) => {
  const updatedFoodDrive = {
    id: args.id,
    name: args.name,
    description: args.description,
    startDate: args.startDate,
    endDate: args.endDate,
    location: args.location,
    contactNumber: args.contactNumber,
    email: args.email,
    maxCapacity: args.maxCapacity,
    autoAccept: args.autoAccept,
    isOpen: args.isOpen,
    food: args.food,
  };
  const { data } = await context.database.events.update(
    args.id,
    updatedFoodDrive
  );
  context.pubsub.publish(eventTriggers.foodDriveUpdated, {
    foodDriveUpdated: data,
  });
  return data;
};

const deleteFoodDrive = async (_, args, context) => {
  const { data } = await context.database.events.delete(args.id);
  context.pubsub.publish(eventTriggers.foodDriveDeleted, {
    foodDriveDeleted: args.id,
  });
  return data;
};

const Mutation = {
  createFoodDrive,
  updateFoodDrive,
  deleteFoodDrive,
};

export default {
  Mutation,
};
