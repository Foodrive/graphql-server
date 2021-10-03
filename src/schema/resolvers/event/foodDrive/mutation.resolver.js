import dayjs from "dayjs";
import { AuthenticationError } from "apollo-server-errors";
import { eventTriggers } from "../../../../utils/pubSubTriggers";
import { EventType, InvitationStatus } from "../../../../utils/constants";
import pubsub from "../../../../utils/pubsub";

const createFoodDrive = async (_, args, context) => {
  if (!context.userId) {
    throw new AuthenticationError("Not authenticated");
  }

  // Convert dates to unix so that it's easier to query and filter
  const startDate = dayjs(args.startDate).unix();
  const endDate = dayjs(args.endDate).unix();

  const newFoodDrive = {
    name: args.name,
    description: args.description,
    startDate,
    endDate,
    type: EventType.foodDrive,
    location: args.location,
    organiserId: args.organiserId,
    contactNumber: args.contactNumber,
    email: args.email,
    maxCapacity: args.maxCapacity,
    autoAccept: args.autoAccept ?? true,
    isOpen: true,
    food: args.food,
    facebookPage: args.facebookPage,
  };
  const { data } = await context.database.events.create(newFoodDrive);
  await pubsub.publish(eventTriggers.foodDriveCreated, {
    foodDriveCreated: data,
  });
  return data;
};

const updateFoodDrive = async (_, args, context) => {
  if (!context.userId) {
    throw new AuthenticationError("Not authenticated");
  }

  // We do this so that it's easier to
  // compare using couchDB queries when filtering by date
  const startDate = dayjs(args.startDate).unix();
  const endDate = dayjs(args.endDate).unix();

  const updatedFoodDrive = {
    id: args.id,
    name: args.name,
    description: args.description,
    startDate,
    endDate,
    location: args.location,
    contactNumber: args.contactNumber,
    email: args.email,
    maxCapacity: args.maxCapacity,
    autoAccept: args.autoAccept,
    isOpen: args.isOpen,
    food: args.food,
    facebookPage: args.facebookPage,
  };
  const { data } = await context.database.events.update(
    args.id,
    updatedFoodDrive
  );
  await pubsub.publish(eventTriggers.foodDriveUpdated, {
    foodDriveUpdated: data,
  });
  return data;
};

const deleteFoodDrive = async (_, args, context) => {
  if (!context.userId) {
    throw new AuthenticationError("Not authenticated");
  }

  const { data: eventInvitations } = await context.database.invitations.find({
    eventId: args.id,
    $or: [
      { status: InvitationStatus.pending },
      { status: InvitationStatus.accepted },
    ],
  });
  const cancelInvitations = eventInvitations.map(async (inv) =>
    context.database.invitations.update(inv.id, {
      status: InvitationStatus.cancelled,
    })
  );
  // @todo optimise the cancelled invitation step with bulk update operation
  await Promise.all(cancelInvitations);

  const { data } = await context.database.events.delete(args.id);
  await pubsub.publish(eventTriggers.foodDriveDeleted, {
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
