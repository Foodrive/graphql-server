// get all user invitations
import { InvitationStatus } from "../../../utils/constants";

const getInvitations = async (_, args, context) => {
  const query = {
    attendeeId: args.userId,
    eventId: args.eventId,
    $nor: [{ status: InvitationStatus.cancelled }],
  };

  if (args.statusFilter) {
    if (args.statusFilter.includes(InvitationStatus.cancelled)) {
      delete query.$nor;
    }
    query.$or = args.statusFilter.map((status) => ({
      status,
    }));
  }

  const { data: allInvitations } = await context.database.invitations.find(
    query
  );

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
