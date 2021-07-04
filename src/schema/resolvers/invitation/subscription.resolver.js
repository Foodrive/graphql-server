import { invitationTriggers } from "utils/pubSubTriggers";

const createdInvitation = {
  subscribe: (_0, args, { pubsub }) =>
    pubsub.asyncIterator(invitationTriggers.createdInvitation),
};

const acceptedInvitation = {
  subscribe: (_0, _1, { pubsub }) =>
    pubsub.asyncIterator(invitationTriggers.acceptedInvitation),
};
const rejectedInvitation = {
  subscribe: (_0, _1, { pubsub }) =>
    pubsub.asyncIterator(invitationTriggers.rejectedInvitation),
};

const cancelledInvitation = {
  subscribe: (_0, _1, { pubsub }) =>
    pubsub.asyncIterator(invitationTriggers.cancelledInvitation),
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
