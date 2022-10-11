import { Request } from 'express';
import bcrypt from 'bcryptjs';

import Client from '../database';
import validateRequest from '../utilities/validateRequest';
import emailVerification from '../utilities/email/emailVerification';
import { REGISTER_CODE, EXPIRE_CODE_TIME } from '../utilities/common';


export type resetPassword = {
    id: number,
    code: number,
    created_at: string,
    expire_at: string,
    user_id: number,
}


export class ResetPasswordModels {
    // #=======================================================================================#
    // #                          send User email code to rest password                        #
    // #=======================================================================================#
    async sendEmailCodeToRestPassword(request: Request) {
        validateRequest(request);
        try {
            let sqlQuery = 'SELECT * FROM users WHERE email=($1)'
            const DBConnection = await Client.connect()
            const result = await DBConnection.query(sqlQuery, [request.body.email])
            const user = result.rows[0]

            if (!user) {
                throw new Error(`Not user with this email = ${request.body.email}`)
            } else {
                // email exist then send email code
                const registerCode = REGISTER_CODE
                sqlQuery = 'INSERT INTO reset_password (code,created_at, expire_at, user_id) VALUES($1, $2, $3, $4) RETURNING *'
                await DBConnection.query(sqlQuery, [registerCode, new Date(Date.now()), new Date(Date.now() + EXPIRE_CODE_TIME), user.id])
                emailVerification(request, registerCode, true);
            }

            DBConnection.release();
            return user;
        } catch (error) {
            throw new Error(error + '');
        }
    }

    // #=======================================================================================#
    // #                                  reset User password                                  #
    // #=======================================================================================#
    async resetUserPassword(request: Request | any) {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()

            // check if user is exist, get user id from header from token 
            let sqlQuery = 'SELECT * FROM users WHERE email=($1)'
            let result = await DBConnection.query(sqlQuery, [request.body.email])
            const userData = result.rows[0]
            if (!userData) throw new Error('this user doesn\'t exist');


            sqlQuery = 'SELECT * FROM reset_password WHERE user_id=($1)'
            result = await DBConnection.query(sqlQuery, [userData.id])
            let data = result.rows[0]


            if (!data) {
                throw new Error('Not send code to this user ')
            } else if (request.body.code != data.code) {
                throw new Error('invalid code');
            } else if (new Date() >= data.expire_at) {
                // If the code exceeds a certain time and it has not been used in this application for 24 hours
                throw new Error('This code has expired');
            } else {
                const hashPassword = bcrypt.hashSync(request.body.password, 10);
                sqlQuery = 'UPDATE users SET password = ($1) WHERE id=($2)'
                await DBConnection.query(sqlQuery, [hashPassword, userData.id]);
            }
            DBConnection.release();
        } catch (error) {
            throw new Error(error + '');
        }
    }
}