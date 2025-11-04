import { randomUUID } from 'crypto';
import { Res } from './types/http';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const genId = () => randomUUID();
export const isUuid = (id: string):Boolean => UUID_RE.test(id);


export const send = (res: Res, status: number, payload: unknown) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
};

