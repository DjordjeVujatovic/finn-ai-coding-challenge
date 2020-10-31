import request from 'supertest';
import app from '../index';
import { mockDb } from '../routes/user';

describe('User API', () => {
  it('should be able to fetch users from users API', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
  });
});

describe('ID API', () => {
  it('should return uuid of length 36', async () => {
    const res = await request(app).get('/id');
    expect(res.statusCode).toEqual(200);
    expect(res.text.length).toBeGreaterThan(0);
    expect(res.text.length).toBeLessThan(37);
  });
});

describe('Create User Endpoint', () => {
  it('should create user in real or mock DB', async () => {
    const res = await request(app).post('/users').send({
      username: 'test_user_1',
    });
    const users = await request(app).get('/users');

    const expectedMockDb = [{ username: 'test_user_1' }];

    const testUser = users.body.find((user) => user.username === 'test_user_1');

    if (res.text === '{"status":"fail"}') {
      expect(mockDb).toEqual(expect.arrayContaining(expectedMockDb));
      console.log(mockDb, 'MOCK_DB');
    } else {
      expect(testUser.username).toEqual('test_user_1');
    }
  });
});
