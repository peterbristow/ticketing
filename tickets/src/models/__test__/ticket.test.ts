import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async () => {
  const ticket = Ticket.build({
    title: 'ticket',
    price: 5,
    userId: '123',
  });

  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  await firstInstance!.save();

  const expectingErrorMessage = `No matching document found for id "${ticket.id}" version 0 modifiedPaths "price"`;
  await expect(secondInstance!.save()).rejects.toThrow(expectingErrorMessage);
});

it('implements optimistic concurrency control increments verion number', async () => {
  const ticket = Ticket.build({
    title: 'ticket',
    price: 5,
    userId: '123',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
