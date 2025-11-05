import request from 'supertest';
import { server } from '../src/server';

afterAll((done) => {
  server.close(done);
});

describe('Users API', () => {

    test('Get all users -> []', async () => {
        const res = await request(server).get('/api/users');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

});
