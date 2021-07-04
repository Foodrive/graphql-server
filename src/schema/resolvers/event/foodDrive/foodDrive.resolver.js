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

const FoodDrive = {
  organiser,
  invitations,
};

export default {
  FoodDrive,
};
