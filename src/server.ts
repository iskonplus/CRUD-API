import 'dotenv/config';
import http from 'node:http';
import { handleMethod } from './app';

const PORT = Number(process.env.PORT) || 4000;

const server = http.createServer((req, res) => {
  handleMethod(req as any, res as any);
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});