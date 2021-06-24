const Query = {
  myType: (parent, args, context) => ({
    id: "my-type",
    name: "My Type",
  }),
};

const MyType = {
  id: (parent) => parent.id,
  name: (parent) => parent.name,
};

export default {
  Query,
  MyType,
};
