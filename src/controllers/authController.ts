import { Request, Response, NextFunction } from 'express';

import { UserModels } from '../models/userModels'
import { EmailVerificationModels } from '../models/emailVerificationModels'
import { ResetPasswordModels } from '../models/resetPasswordModels'

const newUser = new UserModels()
const emailVerification = new EmailVerificationModels()
const resetPassword = new ResetPasswordModels()
// #=======================================================================================#
// #			                            Register                                       #
// #=======================================================================================#
export const register = async (request: Request, response: Response, next: NextFunction) => {
    await newUser.register(request)
        .then(userData => {
            response.json({
                status: 1,
                msg: `The code has been sent to your email 👉 ${userData.email}`,
                data: userData
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
        .then(userData => {
            response.json({
                status: 1,
                data: userData
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
                data: {
                    status: 1,
                    data: 'email activate successful',
                }
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
        .then((userData) => {
            response.json({
                status: 1,
                data: {
                    status: 1,
                    data: `The code has been sent to your email 👉 ${userData.email}`
                }
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
                data: {
                    status: 1,
                    data: 'password updated successful',
                }
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
        .then(userData => {
            response.json({
                status: 1,
                token: userData.token,
                data: userData
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
        .then(userData => {
            response.json({
                status: 1,
                count: userData.length,
                data: userData
            })
        }).catch(error => {
            next(error)
        })
}





