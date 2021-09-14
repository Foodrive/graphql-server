import dayjs from "dayjs";

const event = async (parent, _, context) => {
  const { data } = await context.database.events.getById(parent.eventId);
  return data;
};

const claimedDate = async (parent) =>
  dayjs(parent.claimedDate).toDate().toUTCString();

const Invitation = {
  event,
  claimedDate,
};

export default {
  Invitation,
};
