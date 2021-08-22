// get all user invitations
const getInvitations = async (_, args, context) => {
  const { data: allInvitations } = await context.database.invitations.find({
    attendeeId: args.userId,
    eventId: args.eventId,
  });

  return allInvitations;
};

// get invitation by ID
const getInvitationById = async (_, args, context) => {
  const { data: invitation } = await context.database.invitations.getById(
    args.invId
  );

  return invitation;
};

const Query = {
  getInvitations,
  getInvitationById,
};
export default {
  Query,
};
