import { Router } from 'express';
import { body, param } from 'express-validator';

import {
    create,
    updateRates,
    deleteRates
} from '../../controllers/ratesController'
import checkTokens from '../../utilities/checkTokens';


const rate: Router = Router()

rate.post('', checkTokens, checkDate(), create)

rate.route('/:rate_id')
    .put(checkTokens, checkID(), checkDate(), updateRates)
    .delete(checkTokens, checkID(), deleteRates)

// #=======================================================================================#
// #			                         check function                                    #
// #=======================================================================================#

function checkID() {
    return [
        param("rate_id").exists().withMessage('you must enter rate id').isInt().withMessage('invalid category rate')
    ]
}

function checkDate() {
    return [
        body('rate').exists().withMessage('you must enter rate')
            .isInt().withMessage('rate must be integer')
            .isLength({ min: 0, max: 5 }).withMessage('rate must be between 0 to 5'),
        body('movie_id').exists().withMessage('you must enter movie_id').isInt().withMessage('invalid movie_id'),

    ]
}




export default rate;