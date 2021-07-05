import { invitationTriggers } from "utils/pubSubTriggers";
import { InvitationStatus } from "utils/constants";

const createInvitation = async (_, args, context) => {
  // get Event for invitation
  const { data: eventData } = await context.database.events.getById(
    args.eventId
  );

  // calculate random 6 digit generated code
  const { data: invitations } = await context.database.invitations.find({
    eventId: args.eventId,
  });

  let randomCode = "";
  while (true) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const checkExistingCode = invitations.filter(
      (invitation) => invitation.code === code
    );
    if (checkExistingCode.length === 0) {
      randomCode = code;
      break;
    }
  }

  const currentDateTime = new Date().toISOString();

  //  create invitation object
  const invitation = {
    eventId: args.eventId,
    attendeeId: args.userId,
    code: randomCode,
    numAttendees: args.numAttendees,
    status: eventData.autoAccept
      ? InvitationStatus.accepted
      : InvitationStatus.pending,
    claimedDate: currentDateTime,
  };

  // insert invitation
  const { data: invitationData, statusCode } =
    await context.database.invitations.create(invitation);

  if (statusCode === 200) {
    context.pubsub.publish(invitationTriggers.createdInvitation, {
      createdInvitation: invitationData,
    });
  }

  return invitationData;
};

const invitationStatusHelper = async (invId, invitationStatus, context) => {
  const { data: updatedInvitation } = await context.database.invitations.update(
    invId,
    { status: invitationStatus }
  );
  return updatedInvitation;
};

const cancelInvitation = (_, args, context) => {
  const updatedInvitation = invitationStatusHelper(
    args.invId,
    InvitationStatus.cancelled,
    context
  );

  context.pubsub.publish(invitationTriggers.cancelledInvitation, {
    cancelledInvitation: updatedInvitation,
  });

  return updatedInvitation;
};

const acceptInvitation = (_, args, context) => {
  const updatedInvitation = invitationStatusHelper(
    args.invId,
    InvitationStatus.accepted,
    context
  );

  context.pubsub.publish(invitationTriggers.acceptedInvitation, {
    acceptedInvitation: updatedInvitation,
  });

  return updatedInvitation;
};

const rejectInvitation = (_, args, context) => {
  const updatedInvitation = invitationStatusHelper(
    args.invId,
    InvitationStatus.rejected,
    context
  );

  context.pubsub.publish(invitationTriggers.rejectedInvitation, {
    rejectedInvitation: updatedInvitation,
  });

  return updatedInvitation;
};

const verifyInvitation = (_, args, context) =>
  invitationStatusHelper(args.invId, InvitationStatus.claimed, context);

const Mutation = {
  createInvitation,
  verifyInvitation,
  cancelInvitation,
  acceptInvitation,
  rejectInvitation,
};

export default {
  Mutation,
};
