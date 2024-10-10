import { Publisher, OrderCreatedEvent, Subjects } from '@earnestgroup/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
