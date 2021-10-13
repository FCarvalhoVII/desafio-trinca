import express from 'express';
import UserController from './controllers/UserController';
import BarbecueController from './controllers/BarbecueController';
import ContributorController from './controllers/ContributorController';
import authMiddleware from './middlewares/auth';

const routes = express.Router();

routes.post('/register', UserController.register);
routes.post('/login', UserController.authenticate);

routes.get('/barbecue', BarbecueController.listBarbecues);
routes.get('/barbecue/:barbecueId', BarbecueController.listBarbecue);
routes.post('/barbecue', authMiddleware, BarbecueController.create);
routes.delete('/barbecue/:barbecueId', authMiddleware, BarbecueController.delete);

routes.get('/contributor/:barbecueId', ContributorController.listContributors);
routes.post('/contributor/:barbecueId', authMiddleware, ContributorController.create);
routes.put('/contributor/:contributorId', authMiddleware, ContributorController.update);
routes.delete('/contributor/:contributorId', authMiddleware, ContributorController.delete);

export default routes;