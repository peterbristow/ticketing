import request from 'supertest';
import { app } from '../../app';
import CreateId from '../../test/utils/create-id';

it('returns a 404 if the ticket is NOT found', async () => {
  const id = CreateId();

  const response = await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const title = 'Valid title';
  const price = 20;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
