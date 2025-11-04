import { Req, Res } from './types/http';
import { usersRouter } from './routers/users.routers';

export const handleMethod = async (req: Req, res: Res) => {

    try {
        const handled = await usersRouter(req, res);

        if (!handled) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Not found' }));
        }

    } catch {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }

};