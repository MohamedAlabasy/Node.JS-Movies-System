import { Request, Response, NextFunction } from 'express';

import { UsersModels } from '../models/usersModels'
import { EmailVerificationModels } from '../models/emailVerificationModels'
import { ResetPasswordModels } from '../models/resetPasswordModels'

const newUser = new UsersModels()
const emailVerification = new EmailVerificationModels()
const resetPassword = new ResetPasswordModels()
// #=======================================================================================#
// #			                            Register                                       #
// #=======================================================================================#
export const register = async (request: Request, response: Response, next: NextFunction) => {
    await newUser.register(request)
        .then(data => {
            response.json({
                status: 1,
                msg: `The code has been sent to your email 👉 ${data.email}`,
                data
            })
        }).catch(error => {
            next(error)
        })
}

// #=======================================================================================#
// #			                            login                                          #
// #=======================================================================================#
export const login = async (request: Request, response: Response, next: NextFunction) => {
    await newUser.login(request)
        .then(data => {
            response.json({
                status: 1,
                data
            })
        }).catch(error => {
            next(error)
        })
}

// #=======================================================================================#
// #			                      activate User email                                  #
// #=======================================================================================#
export const activateUserEmail = async (request: Request, response: Response, next: NextFunction) => {
    await emailVerification.activateUserEmail(request)
        .then(_ => {
            response.json({
                status: 1,
                msg: 'email activate successful',
            })
        }).catch(error => {
            next(error)
        })
}

// #=======================================================================================#
// #                         send User email code to rest password                         #
// #=======================================================================================#
export const sendEmailCodeToRestPassword = async (request: Request, response: Response, next: NextFunction) => {
    await resetPassword.sendEmailCodeToRestPassword(request)
        .then(data => {
            response.json({
                status: 1,
                msg: `The code has been sent to your email 👉 ${data.email}`
            })
        }).catch(error => {
            next(error)
        })
}
// #=======================================================================================#
// #                                  reset User password                                  #
// #=======================================================================================#
export const resetUserPassword = async (request: Request, response: Response, next: NextFunction) => {
    await resetPassword.resetUserPassword(request)
        .then(_ => {
            response.json({
                status: 1,
                msg: 'password updated successful',
            })
        }).catch(error => {
            next(error)
        })
}

// #=======================================================================================#
// #			                       get User by id                                      #
// #=======================================================================================#
export const getUserById = async (request: Request, response: Response, next: NextFunction) => {
    await newUser.getUserById(request)
        .then(data => {
            response.json({
                status: 1,
                data
            })
        }).catch(error => {
            next(error)
        })
}
// #=======================================================================================#
// #                                      get all Users                                    #
// #=======================================================================================#
export const getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
    await newUser.getAllUsers(request)
        .then(data => {
            response.json({
                status: 1,
                count: data.length,
                data
            })
        }).catch(error => {
            next(error)
        })
}





