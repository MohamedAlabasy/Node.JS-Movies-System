import { Request } from 'express';

import Client from '../database';

import validateRequest from '../utilities/validateRequest';


export type emailVerification = {
    id: number,
    code: number,
    created_at: string,
    expire_at: string,
    user_id: number,
}


export class EmailVerificationModels {
    // #=======================================================================================#
    // #			                      activate User email                                  #
    // #=======================================================================================#
    async activateUserEmail(request: Request | any) {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()

            // check if user is exist, get user id from header from token 
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            let result = await DBConnection.query(sqlQuery, [request.user.id])
            let data = result.rows[0]
            if (!data) throw new Error('this user doesn\'t exist');


            sqlQuery = 'SELECT * FROM email_verification WHERE user_id=($1)'
            result = await DBConnection.query(sqlQuery, [request.user.id])
            data = result.rows[0]

            if (!data) {
                throw new Error('Not send code to this user')
            } else if (request.body.code != data.code) {
                throw new Error('invalid code');
            } else if (new Date() >= data.expire_at) {
                // If the code exceeds a certain time and it has not been used in this application for 24 hours
                throw new Error('This code has expired');
            } else {
                sqlQuery = 'UPDATE users SET is_verification = true WHERE id=($1)'
                await DBConnection.query(sqlQuery, [request.user.id]);
            }
            DBConnection.release();
        } catch (error) {
            throw new Error(error + '');
        }
    }
}