const requestor = async (parent, _, context) => {
  const { data } = await context.database.requestor.getById(parent.requestor);
  return data;
};

const Request = {
  requestor,
};

export default {
  Request,
};
