import { AuthenticationError } from "apollo-server-errors";
import dayjs from "dayjs";
import pubsub from "../../../utils/pubsub";
import { invitationTriggers } from "../../../utils/pubSubTriggers";
import { InvitationStatus } from "../../../utils/constants";

const invitationStatusHelper = async (invId, invitationStatus, context) => {
  const { data: updatedInvitation } = await context.database.invitations.update(
    invId,
    { status: invitationStatus }
  );
  return updatedInvitation;
};

const acceptInvitation = async (invId, context) => {
  const updatedInvitation = await invitationStatusHelper(
    invId,
    InvitationStatus.accepted,
    context
  );

  await pubsub.publish(invitationTriggers.acceptedInvitation, {
    acceptedInvitation: updatedInvitation,
  });

  return updatedInvitation;
};

const createInvitation = async (_, args, context) => {
  if (!context.userId) {
    throw new AuthenticationError("Not authenticated");
  }

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

  const currentDateTime = dayjs().unix();

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
    await pubsub.publish(invitationTriggers.createdInvitation, {
      createdInvitation: invitationData,
    });
  }

  return invitationData;
};

const cancelInvitation = async (_, args, context) => {
  if (!context.userId) {
    throw new AuthenticationError("Not authenticated");
  }

  const updatedInvitation = await invitationStatusHelper(
    args.invId,
    InvitationStatus.cancelled,
    context
  );

  await pubsub.publish(invitationTriggers.cancelledInvitation, {
    cancelledInvitation: updatedInvitation,
  });

  return updatedInvitation;
};

const acceptInvitationList = async (_, args, context) => {
  if (!context.userId) {
    throw new AuthenticationError("Not authenticated");
  }

  if (!args.invites || args.invites.length < 0) {
    return [];
  }

  const updateRequests = args.invites.map((invId) =>
    acceptInvitation(invId, context)
  );

  const updateResponses = await Promise.allSettled(updateRequests);

  return updateResponses
    .filter((res) => res.status === "fulfilled")
    .map((res) => res.value);
};

const rejectInvitation = async (_, args, context) => {
  if (!context.userId) {
    throw new AuthenticationError("Not authenticated");
  }

  const updatedInvitation = await invitationStatusHelper(
    args.invId,
    InvitationStatus.rejected,
    context
  );

  await pubsub.publish(invitationTriggers.rejectedInvitation, {
    rejectedInvitation: updatedInvitation,
  });

  return updatedInvitation;
};

const verifyInvitation = async (_, args, context) => {
  if (!context.userId) {
    throw new AuthenticationError("Not authenticated");
  }

  return invitationStatusHelper(args.invId, InvitationStatus.claimed, context);
};

const Mutation = {
  createInvitation,
  verifyInvitation,
  cancelInvitation,
  acceptInvitationList,
  rejectInvitation,
};

export default {
  Mutation,
};
