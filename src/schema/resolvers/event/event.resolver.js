export const EventType = {
  foodDiscount: "FOODDISCOUNT",
  foodDrive: "FOODDRIVE",
  foodRequest: "FOODREQUEST",
};

// General event resolver

const creator = (parent) =>
  // TODO query DB for user
  parent.creator;

const Event = {
  creator,
  __resolveType(event) {
    switch (event.type) {
      case EventType.foodDiscount:
        return EventType.foodDiscount;
      case EventType.foodDrive:
        return EventType.foodDrive;
      default:
        return EventType.foodRequest;
    }
  },
};

// Food drive resolvers

const food = (parent) =>
  // TODO search food items in DB using IDs
  parent.food;

const attendees = (parent) =>
  // TODO search for attendees in DB using IDs
  parent.attendees;

const totalServings = (parent) =>
  // TODO add up all servings left in food list
  0;

const FoodDrive = {
  food,
  attendees,
  totalServings,
};

// Food request resolvers

const FoodRequest = {};

export default {
  Event,
  FoodDrive,
  FoodRequest,
};
