import request from 'supertest';
import { server } from '../src/server';

afterAll((done) => {
    server.close(done);
});

let userId;
const incomingUser = {
    username: 'Artur',
    age: 38,
    hobbies: ['reading']
}

describe('Users API', () => {

    test('Get all users -> []', async () => {
        const res = await request(server).get('/api/users');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('POST create user valid -> 201, user', async () => {
        const res = await request(server).post('/api/users').send(incomingUser);
        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        userId = res.body.id;
        expect(res.body).toEqual({...incomingUser, id: userId});
    });

});
