import { Req, Res } from '../types/http';
import { UsersController } from '../controllers/users.controllers';

export const usersRouter = async (req: Req, res: Res): Promise<boolean> => {

  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  const segments = url.pathname.split('/').filter(Boolean); 

  const isUsers = segments[0] === 'api' && segments[1] === 'users';
  if (!isUsers) return false;

  const id = segments[2];

  if (req.method === 'GET' && !id) return UsersController.getAll(req, res), true;
  if (req.method === 'GET' && id)  return UsersController.getOne(req, res, id), true;

  return false;
};