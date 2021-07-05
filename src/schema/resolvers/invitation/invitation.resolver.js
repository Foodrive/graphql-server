const event = async (parent, _, context) => {
  const { data } = await context.database.events.getById(parent.eventId);
  return data;
};

const Invitation = {
  event,
};

export default {
  Invitation,
};
