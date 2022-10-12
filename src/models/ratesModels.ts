import { Request } from 'express';

import Client from '../database';

import validateRequest from '../utilities/validateRequest';

export type rates = {
    id: number,
    rate: number,
    user_id: number,
    movie_id: number
}

export class ratesModels {
    // #=======================================================================================#
    // #			                            create                                         #
    // #=======================================================================================#
    async create(request: Request | any): Promise<rates> {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            let result = await DBConnection.query(sqlQuery, [request.user.id])
            const userData = result.rows[0]
            if (!userData) throw new Error('this user doesn\'t exist');


            sqlQuery = 'SELECT * FROM movies WHERE id=($1)'
            result = await DBConnection.query(sqlQuery, [request.body.movie_id])
            let data = result.rows[0]
            if (!data) throw new Error(`there is no movie with this is ${request.body.movie_id}`);

            // sqlQuery = 'SELECT * FROM rates WHERE user_id = ($1) and movie_id = ($2)'
            // result = await DBConnection.query(sqlQuery, [userData.id, request.body.movie_id])
            // data = result.rows
            // if (data) throw new Error('you already rated this move');

            // create rate
            sqlQuery = 'INSERT INTO rates (rate,user_id,movie_id) VALUES($1,$2,$3) RETURNING *'
            result = await DBConnection.query(sqlQuery, [request.body.rate, userData.id, request.body.movie_id])
            data = result.rows[0]

            // update move rate
            sqlQuery = 'SELECT * FROM rates WHERE movie_id=($1)'
            result = await DBConnection.query(sqlQuery, [request.body.movie_id])
            data = result.rows

            sqlQuery = 'UPDATE movies SET rate = ($1) WHERE id = ($2)'
            await DBConnection.query(sqlQuery, [calculateRates(data), request.body.movie_id]);


            DBConnection.release()
            return data
        } catch (error) {
            throw new Error(error + '')
        }
    }

    // #=======================================================================================#
    // #                                     update rates                                      #
    // #=======================================================================================#
    async updateRates(request: Request | any): Promise<rates> {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            let result = await DBConnection.query(sqlQuery, [request.user.id])
            const userData = result.rows[0]
            if (!userData) throw new Error('this user doesn\'t exist');

            sqlQuery = 'SELECT * FROM movies WHERE id=($1)'
            result = await DBConnection.query(sqlQuery, [request.params.movie_id])
            let data = result.rows[0]
            if (!data) throw new Error(`there is no movie with this is ${request.params.movie_id}`);


            sqlQuery = 'SELECT * FROM rates WHERE user_id = ($1) and movie_id = ($2)'
            result = await DBConnection.query(sqlQuery, [userData.id, request.params.movie_id])
            data = result.rows
            if (!data) throw new Error('No rate on this move');

            if (data.user_id != userData.id) throw new Error('this movie rate can only be updated by the user who created it')


            sqlQuery = 'UPDATE rates SET rate = ($1) WHERE user_id = ($2)'
            await DBConnection.query(sqlQuery, [request.body.rate, userData.id]);

            // update move rate
            sqlQuery = 'SELECT * FROM rates WHERE movie_id=($1)'
            result = await DBConnection.query(sqlQuery, [request.params.movie_id])
            data = result.rows

            sqlQuery = 'UPDATE movies SET rate = ($1) WHERE id = ($2)'
            await DBConnection.query(sqlQuery, [calculateRates(data), request.params.movie_id]);

            DBConnection.release();
            return data;
        } catch (error) {
            throw new Error(error + '')
        }
    }
    // #=======================================================================================#
    // #                                    delete rates                                       #
    // #=======================================================================================#
    async deleteRates(request: Request | any): Promise<rates> {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            let result = await DBConnection.query(sqlQuery, [request.user.id])
            const userData = result.rows[0]
            if (!userData) throw new Error('this user doesn\'t exist');

            sqlQuery = 'SELECT * FROM movies WHERE id=($1)'
            result = await DBConnection.query(sqlQuery, [request.params.movie_id])
            let data = result.rows[0]
            if (!data) throw new Error(`there is no movie with this is ${request.params.movie_id}`);


            sqlQuery = 'SELECT * FROM rates WHERE user_id = ($1) and movie_id = ($2)'
            result = await DBConnection.query(sqlQuery, [userData.id, request.params.movie_id])
            data = result.rows
            if (!data) throw new Error('No rate on this move');

            if (data.user_id != userData.id) throw new Error('this movie rate can only be deleted by the user who created it')

            sqlQuery = 'DELETE FROM rates WHERE movie_id = ($1)'
            await DBConnection.query(sqlQuery, [request.params.movie_id]);
            DBConnection.release();

            return data;
        } catch (error) {
            throw new Error(error + '')
        }
    }
}

// #=======================================================================================#
// #                                    calculate rates                                    #
// #=======================================================================================#
function calculateRates(_rates: rates[]): number {
    // const actualRate = _rates.reduce((previousValue, currentValue) => { previousValue.rate + currentValue.rate);
    let actualRate = 0;
    for (const iterator of _rates) {
        actualRate += iterator.rate;
    }
    return +((actualRate / _rates.length * 5) / 5).toFixed(1);
}



