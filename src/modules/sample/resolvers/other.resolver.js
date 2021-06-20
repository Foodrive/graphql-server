function otherObject(parent, args, context) {
  return {
    id: "other-object",
    name: "Other Object",
  };
}

const Query = {
  otherObject,
};

const OtherObject = {
  id: (parent) => parent.id,
  name: (parent) => parent.name,
};

module.exports = {
  Query,
  OtherObject,
};
