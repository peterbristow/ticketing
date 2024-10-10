import { OrderCancelledListener } from '../order-cancelled-listener';
import { OrderCancelledEvent } from '@earnestgroup/common';
import { natsWrapper } from '../../../nats-wrapper';
import { Order } from '../../../models/order';
import CreateId from '../../../test/utils/create-id';
import { OrderStatus } from '@earnestgroup/common';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.build({
    id: CreateId(),
    status: OrderStatus.Created,
    price: 10,
    userId: CreateId(),
    version: 0,
  });
  await order.save();

  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: 1,
    ticket: {
      id: CreateId(),
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order };
};

it('updates the status of the order', async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(data.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('ack the message', async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
