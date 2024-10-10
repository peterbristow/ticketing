import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order } from '../../models/order';
import CreateId from '../../test/utils/create-id';

it('fetches the order', async () => {
  const ticket = Ticket.build({
    id: CreateId(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const user = global.signup();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it('returns an error if one user trys to fetch another users order', async () => {
  const ticket = Ticket.build({
    id: CreateId(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const user = global.signup();
  const userTwo = global.signup();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', userTwo)
    .send()
    .expect(401);
});
