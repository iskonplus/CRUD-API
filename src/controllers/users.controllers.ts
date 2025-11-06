import { Req, Res } from '../types/http';
import { isUuid, send, readJsonBody, validateIncomingUserData, errorMsg, } from '../utils';
import { userService } from '../db';
import { IncomingUser } from '../types/incomingUser';

export const UsersController = {
    getAll: async (_req: Req, res: Res) => {
        const data = await userService.getAll();
        return send(res, 200, data);
    },

    getUser: async (_req: Req, res: Res, id: string) => {
        if (!isUuid(id)) return send(res, 400, { message: errorMsg.invalid.uuid });
        const user = await userService.getById(id);
        if (!user) return send(res, 404, { message: errorMsg.notFound.user });

        return send(res, 200, user);
    },
    createUser: async (req: Req, res: Res) => {
        let body;

        try {
            body = await readJsonBody<IncomingUser>(req);
        } catch {
            return send(res, 400, { message: errorMsg.invalid.json });
        }

        const isIncomingDataValid = validateIncomingUserData(body);
        if (!isIncomingDataValid) return send(res, 400, { message: errorMsg.invalid.required });

        const newUser = await userService.create(body);
        return send(res, 201, newUser);
    },
    updateUser: async (req: Req, res: Res, id: string) => {
        if (!isUuid(id)) return send(res, 400, { message: errorMsg.invalid.uuid });
        const user = await userService.getById(id);
        if (!user) return send(res, 404, { message: errorMsg.notFound.user });

        let body

        try {
            body = await readJsonBody<IncomingUser>(req);
        } catch {
            return send(res, 400, { message: errorMsg.invalid.json });
        }

        const updatedUserData = { ...user, ...body };
        const isIncomingDataValid = validateIncomingUserData(updatedUserData);
        if (!isIncomingDataValid) return send(res, 400, { message: errorMsg.invalid.required });

        const updatedUser = await userService.update(updatedUserData, id);
        return send(res, 200, updatedUser);
    },
    deleteUser: async (_req: Req, res: Res, id: string) => {
        if (!isUuid(id)) return send(res, 400, { message: errorMsg.invalid.uuid });
        const isUserDeleted = await userService.delete(id);
        if (!isUserDeleted) return send(res, 404, { message: errorMsg.notFound.user });

        return send(res, 204, '');
    }

};