const location = async (parent, _, context) => {
  const { data } = await context.database.location.getById(parent.location);
  return data;
};

const requestor = async (parent, _, context) => {
  const { data } = await context.database.requestor.getById(parent.requestor);
  return data;
};

const Request = {
  location,
  requestor,
};

export default {
  Request,
};
