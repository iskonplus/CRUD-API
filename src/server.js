import http from 'node:http';
import { users } from './db.js';
import { statusOk } from './controllers.js';

const PORT = Number(process.env.PORT || 4000);

const server = http.createServer(async (req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathSegments = url.pathname.split('/').filter(Boolean);

    try {

        if (req.method === 'GET' && url.pathname === '/api/users') {
            return statusOk(res, users);
        }



    } catch (error) {
        console.error(error.message);
    }

})

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});