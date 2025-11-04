import { IncomingMessage } from 'node:http';
import { randomUUID } from 'crypto';
import { Res } from './types/http';
import { IncomingUser } from './types/incomingUser';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const getRandomId = () => randomUUID();
export const isUuid = (id: string): Boolean => UUID_RE.test(id);


export const send = (res: Res, status: number, payload: unknown) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
};


export const readJsonBody = <T = unknown>(req: IncomingMessage): Promise<T> =>
    new Promise((resolve, reject) => {
        let data = '';
        req.on('data', (chunk) => (data += chunk));
        req.on('end', () => {
            if (!data) return resolve({} as T);
            try {
                resolve(JSON.parse(data));
            } catch {
                reject(new Error('Invalid JSON'));
            }
        });
        req.on('error', reject);
    });

export const validateUserBody = (body: IncomingUser) => {
    return typeof body.username === 'string'
        && typeof body.age === 'number'
        && Array.isArray(body.hobbies)
        && (body.hobbies).every(hobby => typeof hobby === 'string');

}
