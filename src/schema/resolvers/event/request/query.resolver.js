import { AuthenticationError } from "apollo-server-errors";

const Query = {
  getRequestsByLocation: async (_, args, context) => {
    if (!context.userId) {
      throw new AuthenticationError("Not authenticated.");
    }

    const { coords, range } = args;

    // get bounding circle
    const minLongitude = coords.longitude - range;
    const maxLongitude = coords.longitude + range;

    const minLatitude = coords.latitude - range;
    const maxLatitude = coords.latitude + range;

    // Grab requests that meet the following conditions:
    // - minLongitude < longitude < maxLongitude
    // - minLatitude < latitude < maxLatitude
    const query = {
      $and: [
        {
          "location.coords.longitude": {
            $gte: minLongitude,
          },
        },
        {
          "location.coords.latitude": {
            $gte: minLatitude,
          },
        },
        {
          "location.coords.longitude": {
            $lte: maxLongitude,
          },
        },
        {
          "location.coords.latitude": {
            $lte: maxLatitude,
          },
        },
      ],
    };

    const options = {};
    if (args.maxRequests) {
      options.limit = args.maxRequests;
    }

    const { data } = await context.database.requests.find(query, options);
    return data;
  },

  getRequestsByRequestor: async (_, args, context) => {
    if (!context.userId) {
      throw new AuthenticationError("Not authenticated.");
    }

    const options = {};
    const query = {
      requestor: args.requestorId,
    };

    if (args.maxRequests) {
      options.limit = args.maxRequests;
    }
    const { data } = await context.database.requests.find(query, options);

    return data;
  },
};

export default {
  Query,
};
