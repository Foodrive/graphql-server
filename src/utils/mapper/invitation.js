export const fromInvitationDtoToInvitation = (invitation, event) => ({
  id: invitation.id,
  event: { ...event, id: event._id },
  attendeeId: invitation.attendeeId,
  numAttendees: invitation.numAttendees,
  code: invitation.code,
  status: invitation.invitationStatus,
  claimedDate: invitation.claimedDate,
});
