import express from 'express';


import auth from './api/authRouter';
import categories from './api/categoryRouter';


const routes = express.Router()

routes.use('/user', auth);
routes.use('/categories', categories);




export default routes;