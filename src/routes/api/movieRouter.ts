import { Router } from 'express';
import { body, param } from 'express-validator';

import {
    create,
    getMoviesById,
    getAllMovies,
    updateMovies,
    deleteMovies
} from '../../controllers/moviesController'
import checkTokens from '../../utilities/checkTokens';


const category: Router = Router()

category.get('/:movie_id', checkTokens, checkID(), getMoviesById);
category.put('/:movie_id', checkTokens, checkID(), checkUpdateData(), updateMovies);
category.delete('/:movie_id', checkTokens, checkID(), deleteMovies)

category.route('')
    .post(checkTokens, checkData(), create)
    .get(checkTokens, getAllMovies)

// #=======================================================================================#
// #			                         check function                                    #
// #=======================================================================================#

function checkID() {
    return [
        param("movie_id").exists().withMessage('you must enter movie id').isInt().withMessage('invalid movie id')
    ]
}

function checkData() {
    return [
        body('title').exists().withMessage('you must enter title').isString().withMessage('invalid title'),
        body('description').exists().withMessage('you must enter description').isString().withMessage('invalid description'),
        body('category_id').exists().withMessage('you must enter category_id').isInt().withMessage('invalid category_id'),
    ]
}

function checkUpdateData() {
    return [
        body('title').optional().isString().withMessage('invalid title'),
        body('description').optional().isString().withMessage('invalid description'),
        body('category_id').optional().isInt().withMessage('invalid category_id'),
    ]
}


export default category;