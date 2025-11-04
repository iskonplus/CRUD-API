import { randomUUID } from 'crypto';
import { users } from './db.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const genId = () => randomUUID();
export const isUuid = (id) => UUID_RE.test(id);
export const getUser = (userId) => users.find(user => user.id === userId);