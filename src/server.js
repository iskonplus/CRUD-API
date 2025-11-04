import http from 'node:http';
import { users } from './db.js';
import { statusOk, badRequest, notFound } from './controllers.js';
import { isUuid, getUser } from './utils.js';

const PORT = Number(process.env.PORT || 4000);

const server = http.createServer(async (req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathSegments = url.pathname.split('/').filter(Boolean);

    try {

        if (req.method === 'GET' && url.pathname === '/api/users') {
            return statusOk(res, users);
        }

        if (req.method === 'GET' && pathSegments[0] === 'api' && pathSegments[1] === 'users' && pathSegments.length === 3) {
            const userId = pathSegments[2];

            if (!isUuid(userId)) return badRequest(res, 'Invalid userId (not uuid)');
            const user = getUser(userId);
            if (!user) return notFound(res, 'User not found');

            return statusOk(res, user);
        }



    } catch (error) {
        console.error(error.message);
    }

})

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});