const requestor = async (parent, _, context) => {
  const { data } = await context.database.users.getById(parent.requestor);

  return data;
};

const Request = {
  requestor,
};

export default {
  Request,
};
