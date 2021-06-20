function someObject(parent, args, context) {
  return {
    id: "some-object",
    name: "Some Object",
  };
}

const Query = {
  someObject,
};

const SomeObject = {
  id: (parent) => parent.id,
  name: (parent) => parent.name,
  description: (parent) => parent.description,
};

module.exports = {
  Query,
  SomeObject,
};
