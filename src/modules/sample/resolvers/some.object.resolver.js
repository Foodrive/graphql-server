const Query = {
  someObject: (parent, args, context) => ({
    id: "some-object",
    name: "Some Object",
  }),
};

const SomeObject = {
  id: (parent) => parent.id,
  name: (parent) => parent.name,
  description: (parent) =>
    `Description of object with id: ${parent.id}; name: ${parent.name}`,
};

module.exports = {
  Query,
  SomeObject,
};
