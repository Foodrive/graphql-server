import dayjs from "dayjs";

const event = async (parent, _, context) => {
  const { data } = await context.database.events.getById(parent.eventId);
  return data;
};

const claimedDate = async (parent) =>
  dayjs(parent.claimedDate).toDate().toUTCString();

const attendee = async (parent, _, context) => {
  const { data } = await context.database.users.getById(parent.attendeeId);
  return data;
};

const Invitation = {
  event,
  claimedDate,
  attendee,
};

export default {
  Invitation,
};
