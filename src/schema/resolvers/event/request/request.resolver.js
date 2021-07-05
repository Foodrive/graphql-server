const location = async (parent, _, context) => {
  const { data } = await context.database.location.getById(parent.location);
  return data;
};

const Request = {
  location,
};

export default {
  Request,
};
