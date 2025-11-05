import { IncomingUser } from './types/incomingUser';
import { User } from './types/user';
import { getRandomId } from './utils';

const users: User[] = [];

export const userService = {

    getAll: async (): Promise<User[]> => users,
    getById: async (id: string): Promise<User | undefined> => users.find(user => user.id === id),
    create: async (body: IncomingUser): Promise<User> => {
        const newUser = { id: getRandomId(), ...body };
        users.push(newUser);
        return newUser;
    },
    update: async (body: IncomingUser, id: string): Promise<User> => {
        const idx = users.findIndex(u => u.id === id);
        const updatedUser = { ...users[idx], ...body }
        users[idx] = updatedUser;
        return updatedUser;
    },
    delete: async (id: string): Promise<boolean> => {
        const idx = users.findIndex(u => u.id === id);
        if (idx === -1) return false;
        users.splice(idx, 1);
        return true;
    }

}