import { Req, Res } from './types/http';
import { usersRouter } from './routers/users.routers';
import { errorMsg, send } from './utils';

export const handleMethod = async (req: Req, res: Res) => {

    try {
        const handled = await usersRouter(req, res);

        if (!handled) {
            return send(res, 404, { message: errorMsg.notFound.url });
        }
        
    } catch {
        return send(res, 500, { message: errorMsg.server.internal });
    }

};