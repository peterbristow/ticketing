import { Publisher, OrderCancelledEvent, Subjects } from '@earnestgroup/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
