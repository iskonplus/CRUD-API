import { Req, Res } from '../types/http';
import { isUuid, send, readJsonBody, validateUserBody } from '../utils';
import { userService } from '../db';
import { IncomingUser } from '../types/incomingUser';

export const UsersController = {
    getAll: async (_req: Req, res: Res) => {
        const data = await userService.getAll();
        send(res, 200, data);
    },

    getUser: async (_req: Req, res: Res, id: string) => {
        if (!isUuid(id)) return send(res, 400, { message: 'Invalid userId (not UUID)' });
        const user = await userService.getById(id);
        if (!user) return send(res, 404, { message: 'User not found' });

        send(res, 200, user);
    },
    createUser: async (req: Req, res: Res) => {
        let body;

        try {
            body = await readJsonBody<IncomingUser>(req);
        } catch {
            return send(res, 400, { message: 'Invalid JSON body' });
        }

        const isIncomingDataValid = validateUserBody(body);
        if (!isIncomingDataValid) return send(res, 400, { message: 'Missing or invalid required fields' });

        const newUser = await userService.create(body);
        return send(res, 201, newUser);
    },
    deleteUser: async (_req: Req, res: Res, id: string) => {
        if (!isUuid(id)) return send(res, 400, { message: 'Invalid userId (not UUID)' });
        const isUserDeleted = await userService.delete(id);
        if (!isUserDeleted) return send(res, 404, { message: 'User not found' });

        return send(res, 204, '');
    }

};