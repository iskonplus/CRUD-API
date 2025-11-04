import { IncomingUser } from './types/incomingUser';
import { User } from './types/user';
import { getRandomId } from './utils';

const users: User[] = [
    {
        id: 'a81bc81b-dead-4e5d-abff-90865d1e13b1',
        username: 'Artur',
        age: 38,
        hobbies: ['sleep', 'chili']
    },
    {
        id: 'a81bc81b-dead-4e5d-abff-90865d1e13b2',
        username: 'Artur2',
        age: 39,
        hobbies: ['the same']
    }
];

export const userService = {

    getAll: async (): Promise<User[]> => users,
    getById: async (id: string): Promise<User | undefined> => users.find(user => user.id === id),
    create: async (body: IncomingUser): Promise<User> => {
        const newUser = { id: getRandomId(), ...body };
        users.push(newUser);
        return newUser;
    }

}