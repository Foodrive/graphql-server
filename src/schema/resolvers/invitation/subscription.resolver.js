import { invitationTriggers } from "utils/pubSubTriggers";

const createdInvitation = {
  subscribe: (_, __, context) =>
    context.pubsub.asyncIterator(invitationTriggers.createdInvitation),
};

const acceptedInvitation = {
  subscribe: (_, __, context) =>
    context.pubsub.asyncIterator(invitationTriggers.acceptedInvitation),
};
const rejectedInvitation = {
  subscribe: (_, __, context) =>
    context.pubsub.asyncIterator(invitationTriggers.rejectedInvitation),
};

const cancelledInvitation = {
  subscribe: (_, __, context) =>
    context.pubsub.asyncIterator(invitationTriggers.cancelledInvitation),
};
const Subscription = {
  createdInvitation,
  acceptedInvitation,
  rejectedInvitation,
  cancelledInvitation,
};
export default {
  Subscription,
};
