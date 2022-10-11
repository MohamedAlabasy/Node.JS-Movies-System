import express from 'express';


import auth from './api/authRouter';
import categories from './api/categoryRouter';
import movies from './api/movieRouter';


const routes = express.Router()

routes.use('/user', auth);
routes.use('/categories', categories);
routes.use('/movies', movies);




export default routes;