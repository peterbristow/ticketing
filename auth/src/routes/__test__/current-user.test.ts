import request from 'supertest';
import { app } from '../../app';

it('responds with details about a current user', async () => {
  const cookie = await global.signup();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  console.log(response.body.currentUser);

  expect(response.body.currentUser).toEqual(null);
});
