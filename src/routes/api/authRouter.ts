import { Router } from 'express';
import { body, param } from 'express-validator';

import {
    login,
    register,
    activateUserEmail,
    sendEmailCodeToRestPassword,
    resetUserPassword,
    getUserById,
    getAllUsers
} from '../../controllers/authController'
import checkTokens from '../../utilities/checkTokens';


const auth: Router = Router()

auth.post('/login', checkEmail(), checkPassword(), login);
auth.post('/register', checkEmail(), checkPassword(), checkUserName(), checkUserBirthday(), register);
auth.get('/show', checkTokens, getAllUsers);
auth.get('/show/:id', checkTokens, checkID(), getUserById);
auth.post('/activate', checkTokens, checkCode(), activateUserEmail);
auth.post('/checkEmail', checkEmail(), sendEmailCodeToRestPassword);
auth.post('/resetPassword', checkCode(), checkEmail(), checkPassword(), resetUserPassword);

// #=======================================================================================#
// #			                         check function                                    #
// #=======================================================================================#

function checkID() {
    return [
        param("id").exists().withMessage('you must enter user id').isInt().withMessage('invalid user id')
    ]
}
function checkCode() {
    return [
        body('code').exists().withMessage('you must enter code')
            .isInt().withMessage('code must be integer')
            .isLength({ min: 6, max: 6 }).withMessage('code must consist of 6 numbers')
    ]
}


function checkEmail() {
    return [
        body('email')
            .exists().withMessage('you must enter email')
            .isEmail().withMessage('invalid email')
    ]
}

function checkPassword() {
    return [
        body('password')
            .exists().withMessage('you must enter password')
            .isStrongPassword().withMessage('Password Must contain at least 1 characters(upper and lower),numbers,special characters')
    ]
}

function checkUserName() {
    return [
        body('name').exists().withMessage('you must enter name').isString().withMessage('invalid name'),
    ]
}

function checkUserBirthday() {
    return [
        body('birthday').exists().withMessage('you must enter birthday').isDate({ format: 'YYYY-MM-DD' }).withMessage('invalid birthday you must enter it in form of YYYY-MM-DD'),
    ]
}

export default auth;