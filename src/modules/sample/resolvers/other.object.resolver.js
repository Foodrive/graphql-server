const Query = {
  otherObject: (parent, args, context) => ({
    id: "other-object",
    name: "Other Object",
  }),
};

const OtherObject = {
  id: (parent) => parent.id,
  name: (parent) => parent.name,
};

module.exports = {
  Query,
  OtherObject,
};
