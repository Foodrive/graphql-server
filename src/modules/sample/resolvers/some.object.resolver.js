const Query = {
  someObject: () => ({
    id: "some object",
    name: "Some Object",
  }),

  allSomeObjects: async (parent, _, context) => {
    //e.g. get all objects in the food partition
    const data = await context.database.getAll("food");
    //TO DO: create some mapper classes to map db fields to object fields
    const fromFoodDTO = data.map((item) => {
      return {
        id: item.id,
        name: item.doc.name,
      };
    });
    return fromFoodDTO;
  },
};

const SomeObject = {
  id: (parent) => parent.id,
  name: (parent) => {
    return parent.name;
  },
  description: (parent) => {
    return `Description of object with id: ${parent.id}; name: ${parent.name}`;
  },
};

const Mutation = {
  createSomeObject: (_, { name }, context) => {
    return name;
  },
};

export default {
  Query,
  SomeObject,
  Mutation,
};
