const Event = {
  // when you have a field in your schema that returns a union or interface type, need to speciffy a __resolveType
  __resolveType(obj) {
    if (obj.type === "FOODDRIVE") {
      return "FoodDrive";
    }
    return null;
  },
};

export default {
  Event,
};
