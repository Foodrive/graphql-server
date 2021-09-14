import dayjs from "dayjs";

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

const startDate = async (parent) =>
  dayjs.unix(parent.startDate).toDate().toUTCString();

const endDate = async (parent) =>
  dayjs.unix(parent.endDate).toDate().toUTCString();

const FoodDrive = {
  organiser,
  invitations,
  startDate,
  endDate,
};

export default {
  FoodDrive,
};
