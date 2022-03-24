import supertest from 'supertest';
import server from '../src/App';
import { sequelize, createUsersWithMessages } from '../src/models';

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

afterEach(() => {
  server.server.close();
});

describe('GET /messages', () => {
  test('Testing get all messages', async () => {
    await createUsersWithMessages();

    const response = await supertest(server.app).get('/messages');
    expect(response.body.length).toBeGreaterThan(0);
    server.server.close();
  });
});

describe('GET single message', () => {
  test('Testing get single message', async () => {
    await createUsersWithMessages();

    const response = await supertest(server.app).get('/messages/1');
    expect(response.body.text).toBe('Christers första meddelande');
  });

  test('Testing get single message not found', async () => {
    await createUsersWithMessages();

    const response = await supertest(server.app).get('/messages/99');
    expect(response.status).toBe(404);
  });

  test('Testing get single message with invalid id', async () => {
    await createUsersWithMessages();

    const response = await supertest(server.app).get('/messages/test');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('messageId is not a number');
  });
});

describe('POST /message', () => {
  test('Testing post message', async () => {
    const response = await supertest(server.app).post('/messages')
      .send({
        message: 'testar',
        username: 'Testsson',
      });

    expect(response.status).toBe(200);
    expect(response.body.text).toBe('testar');
  });

  test('Testing post message with missing message', async () => {
    const response = await supertest(server.app).post('/messages')
      .send({
        username: 'Testsson',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('message cant be null');
  });

  test('Testing post message with missing username', async () => {
    const response = await supertest(server.app).post('/messages')
      .send({
        message: 'testar',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('username cant be null');
  });
});

describe('DELETE /message:/messageId', () => {
  test('Testing DELETE message with valid messageId', async () => {
    await createUsersWithMessages();
    const response = await supertest(server.app).delete('/messages/1');

    expect(response.status).toBe(204);
  });

  test('Testing DELETE message with invalid messageId', async () => {
    await createUsersWithMessages();
    const response = await supertest(server.app).delete('/messages/test');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('messageId is not a number');
  });

  test('Testing DELETE message with not found message', async () => {
    await createUsersWithMessages();
    const response = await supertest(server.app).delete('/messages/99');

    expect(response.status).toBe(404);
  });
});
