import {Express} from 'express';
import UserUseCases from '../core/use_cases/UserUseCases';
import userRegisterHandler from './user/post.register';
import userLoginHandler from './user/post.login';
import userGetByHandler from './user/get.userBy';

const userUseCases = new UserUseCases();

/**
 * Binds rutes to the provider Express server instance.
 * @param {Express} server the Express instance to bind routes to
 */
export default function bindRoutes(server: Express): void {
  server.post('/user/register', userRegisterHandler(userUseCases));

  server.post('/user/login', userLoginHandler(userUseCases));

  server.get('/user/get-by', userGetByHandler(userUseCases));
}
