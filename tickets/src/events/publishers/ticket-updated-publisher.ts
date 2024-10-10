import { Publisher, Subjects, TicketUpdatedEvent } from '@earnestgroup/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
