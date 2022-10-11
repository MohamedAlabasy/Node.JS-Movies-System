import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

import Client from '../database';

import validateRequest from '../utilities/validateRequest';
import emailVerification from '../utilities/email/emailVerification';
import { REGISTER_CODE, EXPIRE_CODE_TIME, TOKEN_EXPIRES_IN } from '../utilities/common';

export type users = {
    id: number,
    email: string,
    name: string,
    is_verification: boolean,
    password: string,
    birthday: string,
    is_admin: boolean,
    token: string
}

export class UserModels {
    // #=======================================================================================#
    // #			                            register                                       #
    // #=======================================================================================#
    async register(request: Request): Promise<users> {
        validateRequest(request);
        try {
            // check if email is exit
            const DBConnection = await Client.connect() //open database Connection
            let sqlQuery = 'SELECT * FROM users WHERE email=($1)';
            let result = await DBConnection.query(sqlQuery, [request.body.email.toLocaleLowerCase()]);
            let user = result.rows[0];
            if (user) throw new Error('this email is already exit');

            // create new user
            const hashPassword = bcrypt.hashSync(request.body.password, 10);
            sqlQuery = 'INSERT INTO users (email,name,password,birthday,is_admin,is_verification) VALUES($1, $2, $3, $4,$5, FALSE ) RETURNING *'
            result = await DBConnection.query(sqlQuery, [request.body.email.toLocaleLowerCase(), request.body.name, hashPassword, request.body.birthday, request.body.is_admin || 'FALSE'])
            user = result.rows[0]

            // send email code after create new user
            if (user) {
                const registerCode = REGISTER_CODE;
                sqlQuery = 'INSERT INTO email_verification (code,created_at, expire_at, user_id) VALUES($1, $2, $3, $4) RETURNING *'
                result = await DBConnection.query(sqlQuery, [registerCode, new Date(Date.now()), new Date(Date.now() + EXPIRE_CODE_TIME), user.id])
                emailVerification(request, registerCode);
            }
            DBConnection.release(); //close database Connection


            // to remove password from user object 
            delete user.password
            delete user.is_admin
            return user;
        } catch (error) {
            throw new Error(error + '')
        }
    }

    // #=======================================================================================#
    // #			                            login                                          #
    // #=======================================================================================#
    async login(request: Request): Promise<users> {
        validateRequest(request);
        try {
            let sqlQuery = 'SELECT * FROM users WHERE email=($1)'
            const DBConnection = await Client.connect()
            const result = await DBConnection.query(sqlQuery, [request.body.email.toLocaleLowerCase()])
            const user = result.rows[0]
            DBConnection.release(); //close database Connection

            if (!user) throw new Error(`No user with this email = ${request.body.email}`)

            let IsValidPassword = bcrypt.compareSync(request.body.password, user.password);
            if (!IsValidPassword) throw new Error(`invalid password`)


            // to add token to user object
            user.token = 'Bearer ' + jwt.sign({ id: user.id, is_admin: user.is_admin, is_verification: user.is_verification }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: TOKEN_EXPIRES_IN });


            // to remove password from user object 
            delete user.password
            delete user.is_admin

            return user;
        } catch (error) {
            throw new Error(error + '')
        }
    }
    // #=======================================================================================#
    // #                                     get User by id                                    #
    // #=======================================================================================#
    async getUserById(request: Request): Promise<users> {
        validateRequest(request);
        try {
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            const DBConnection = await Client.connect()
            const result = await DBConnection.query(sqlQuery, [request.params.id])
            const user = result.rows[0]
            DBConnection.release();

            if (!user) {
                throw new Error(`No user with this id = ${request.params.id}`)
            }

            // to remove password from user object 
            delete user.password
            delete user.is_admin

            return user;
        } catch (error) {
            throw new Error(error + '')
        }
    }

    // #=======================================================================================#
    // #                                      get all Users                                    #
    // #=======================================================================================#
    async getAllUsers(request: Request): Promise<users[]> {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()
            const result = await DBConnection.query('SELECT * FROM users')
            const user = result.rows
            DBConnection.release();

            if (user.length === 0) {
                throw new Error('No users to show')
            }

            user.forEach((_user => {
                delete _user.password
                delete _user.is_admin
            }))

            return user;
        } catch (error) {
            throw new Error(error + '')
        }
    }
}
