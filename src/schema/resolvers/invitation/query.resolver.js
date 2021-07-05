// get all user invitations
const getInvitations = async (_, args, context) => {
  const { data: allInvitations } = await context.database.invitations.find({
    userId: args.userId,
  });

  return allInvitations;
};

// get invitation by ID
const getInvitationById = async (_, args, context) => {
  const { data: invitation } = await context.database.invitations.getById(
    args.invId
  );

  invitation.id = invitation._id;

  return invitation;
};

const Query = {
  getInvitations,
  getInvitationById,
};
export default {
  Query,
};
