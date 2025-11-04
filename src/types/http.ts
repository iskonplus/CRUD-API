import { IncomingMessage, ServerResponse } from 'node:http';

export type Req = IncomingMessage & { body?: unknown };
export type Res = ServerResponse<IncomingMessage>;