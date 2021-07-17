import pubsub from "../../../utils/pubsub";
import { invitationTriggers } from "../../../utils/pubSubTriggers";

const createdInvitation = {
  subscribe: () => pubsub.asyncIterator([invitationTriggers.createdInvitation]),
};

const acceptedInvitation = {
  subscribe: () =>
    pubsub.asyncIterator([invitationTriggers.acceptedInvitation]),
};
const rejectedInvitation = {
  subscribe: () => pubsub.asyncIterator([invitationTriggers.rejectedInvitation]),
};

const cancelledInvitation = {
  subscribe: () =>
    pubsub.asyncIterator([invitationTriggers.cancelledInvitation]),
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
