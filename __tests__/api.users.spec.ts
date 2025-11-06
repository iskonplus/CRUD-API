import request from 'supertest';
import { server } from '../src/server';
import { errorMsg } from '../src/utils';
import { User } from '../src/types/user';

afterAll((done) => {
    server.close(done);
});

let userId: string;
const incomingUser = {
    username: 'Artur',
    age: 38,
    hobbies: ['reading']
}
let user: User;
const updateData = { hobbies: ['reading', 'walking'] };
const nonExistent = '9e8f0e5e-7a19-4a3a-9d76-56e5cc33c2ff';
const notUUId = 'not uuid';

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
        user = { id: userId, ...incomingUser };
        expect(res.body).toEqual(user);
    });

    test('POST create user invalid -> 400, error message', async () => {
        const res = await request(server).post('/api/users').send({ ...incomingUser, age: 'string' });
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: errorMsg.invalid.required,
        });
    });

    test('Get user by id -> 200, user', async () => {
        const res = await request(server).get(`/api/users/${userId}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(userId);
        expect(res.body).toEqual(user);
    });

    test('Get user by invalid id -> 400, error message', async () => {
        const res = await request(server).get(`/api/users/${notUUId}`);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: errorMsg.invalid.uuid,
        });
    });

    test('Get user by non-existent id -> 404, error message', async () => {
        const res = await request(server).get(`/api/users/${nonExistent}`);
        expect(res.status).toBe(404);
        expect(res.body).toEqual({
            message: errorMsg.notFound.user,
        });
    });

    test('Update user by id -> 200, updated user', async () => {
        const res = await request(server).put(`/api/users/${userId}`).send(updateData);
        expect(res.status).toBe(200);
        user = { ...user, ...updateData }
        expect(res.body).toEqual(user);
    });

    test('Update user by invalid id -> 400, error message', async () => {
        const res = await request(server).put(`/api/users/${notUUId}`);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            message: errorMsg.invalid.uuid,
        });
    });

    test('Update user by non-existent id -> 404, error message', async () => {
        const res = await request(server).put(`/api/users/${nonExistent}`);
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: errorMsg.notFound.user });
    });

    test('Delete user by id -> 204', async () => {
        const res = await request(server).delete(`/api/users/${userId}`);
        expect(res.status).toBe(204);
       console.log(res.body);
    });

});
