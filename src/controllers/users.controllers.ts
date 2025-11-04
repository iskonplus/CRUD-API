import { Req, Res } from '../types/http';
import { isUuid, send } from '../utils';
import { getUsers } from '../db';

export const UsersController = {
    getAll: async (_req: Req, res: Res) => {
        const data = await getUsers.all();
        send(res, 200, data);
    },

    getOne: async (_req: Req, res: Res, id: string) => {

        if (!isUuid(id)) return send(res, 400, { message: 'Invalid userId (not UUID)' });
        const user = await getUsers.byId(id);
        if (!user) return send(res, 404, { message: 'User not found' });

        send(res, 200, user);
    }

};