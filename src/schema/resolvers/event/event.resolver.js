const Event = {
  __resolveType(event) {
    if (event.type === "FOODDRIVE") {
      return "FoodDrive";
    }
    return null;
  },
};

export default {
  Event,
};
