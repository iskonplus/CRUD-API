import 'dotenv/config';
import http from 'node:http';
import { handleMethod } from './app';
import { Req, Res } from './types/http';

const PORT = Number(process.env.PORT) || 4000;

export const server = http.createServer((req: Req, res: Res) => {
  handleMethod(req, res);
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});