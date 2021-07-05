const organiser = async (parent, _, context) => {
  const { data } = await context.database.users.getById(parent.organiserId);
  return data;
};

const invitations = async (parent, _, context) => {
  const { data } = await context.database.invitations.find({
    eventId: parent.id,
  });
  return data;
};

const Request = {
  organiser,
  invitations,
};

export default {
  Request,
};
