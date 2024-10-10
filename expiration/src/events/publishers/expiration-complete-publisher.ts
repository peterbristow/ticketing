import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@earnestgroup/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
