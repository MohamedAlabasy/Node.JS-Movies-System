import { Router } from 'express';
import { body, param } from 'express-validator';

import {
    create,
    getCategoryById,
    getAllCategories,
    updateCategory,
    deleteCategory
} from '../../controllers/categoriesController'
import checkTokens from '../../utilities/checkTokens';


const category: Router = Router()

category.get('/:category_id', checkTokens, checkID(), getCategoryById);
category.put('/:category_id', checkTokens, checkID(), checkTitle(), updateCategory);
category.delete('/:category_id', checkTokens, checkID(), deleteCategory)

category.route('')
    .post(checkTokens, checkTitle(), create)
    .get(checkTokens, getAllCategories)

// #=======================================================================================#
// #			                         check function                                    #
// #=======================================================================================#

function checkID() {
    return [
        param("category_id").exists().withMessage('you must enter category id').isInt().withMessage('invalid category id')
    ]
}

function checkTitle() {
    return [
        body('title').exists().withMessage('you must enter title').isString().withMessage('invalid title'),
    ]
}


export default category;