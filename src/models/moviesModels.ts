import { Request } from 'express';

import Client from '../database';

import validateRequest from '../utilities/validateRequest';

export type movies = {
    id: number,
    title: string,
    description: string,
    rate: number,
    image: string,
    user_id: number,
    category_id: number
}

export class moviesModels {
    // #=======================================================================================#
    // #			                            create                                         #
    // #=======================================================================================#
    async create(request: Request | any): Promise<movies> {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            let result = await DBConnection.query(sqlQuery, [request.user.id])
            let userData = result.rows[0]
            if (!userData) throw new Error('this user doesn\'t exist');


            sqlQuery = 'SELECT * FROM categories WHERE id=($1)'
            result = await DBConnection.query(sqlQuery, [request.body.category_id])
            let data = result.rows[0]
            if (!data) throw new Error(`there is no category with this is ${request.body.category_id}`);


            sqlQuery = 'SELECT * FROM movies WHERE title=($1)'
            result = await DBConnection.query(sqlQuery, [request.body.title])
            data = result.rows[0]
            if (data) throw new Error('this title is already exit');


            // create movie
            sqlQuery = 'INSERT INTO movies (title,description,image,user_id,category_id,rate) VALUES($1,$2,$3,$4, $5,NULL) RETURNING *'
            result = await DBConnection.query(sqlQuery, [request.body.title, request.body.description, request.file?.filename, userData.id, request.body.category_id])
            data = result.rows[0]


            DBConnection.release()
            return data
        } catch (error) {
            throw new Error(error + '')
        }
    }
    // #=======================================================================================#
    // #                                   get movies by id                                    #
    // #=======================================================================================#
    async getMoviesById(request: Request | any): Promise<movies> {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            let result = await DBConnection.query(sqlQuery, [request.user.id])
            let data = result.rows[0]

            if (!data) throw new Error('this user doesn\'t exist');


            sqlQuery = 'SELECT * FROM movies WHERE id=($1)'
            result = await DBConnection.query(sqlQuery, [request.params.movie_id])
            data = result.rows[0]

            if (!data) throw new Error(`No movie with this id = ${request.params.movie_id}`)

            DBConnection.release();

            return data;
        } catch (error) {
            throw new Error(error + '')
        }
    }

    // #=======================================================================================#
    // #                                     get all movies                                    #
    // #=======================================================================================#
    async getAllMovies(request: Request | any): Promise<movies[]> {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            let result = await DBConnection.query(sqlQuery, [request.user.id])
            let data = result.rows[0]

            if (!data) throw new Error('this user doesn\'t exist');


            result = await DBConnection.query('SELECT * FROM movies')
            data = result.rows
            DBConnection.release();

            if (data.length === 0) {
                throw new Error('No movies to show')
            }

            return data;
        } catch (error) {
            throw new Error(error + '')
        }
    }
    // #=======================================================================================#
    // #                                     update movies                                     #
    // #=======================================================================================#
    async updateMovies(request: Request | any): Promise<movies> {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            let result = await DBConnection.query(sqlQuery, [request.user.id])
            const userData = result.rows[0]
            if (!userData) throw new Error('this user doesn\'t exist');


            sqlQuery = 'SELECT * FROM categories WHERE id=($1)'
            result = await DBConnection.query(sqlQuery, [request.body.category_id])
            let data = result.rows[0]
            if (!data) throw new Error(`there is no category with this is ${request.body.category_id}`);


            sqlQuery = 'SELECT * FROM movies WHERE id = ($1)'
            result = await DBConnection.query(sqlQuery, [request.params.movie_id])
            data = result.rows[0]
            // Make sure the person who wants to make an update category is the person who created it
            if (!data) throw new Error(`there is no movies with this is ${request.params.movie_id}`);

            if (data.user_id != userData.id) throw new Error('this movies can only be updated by the user who created it')


            if (data.title != request.body.title) {
                sqlQuery = 'SELECT * FROM movies WHERE title = ($1)'
                result = await DBConnection.query(sqlQuery, [request.body.title])
                data = result.rows[0]
                if (data) throw new Error('this title is already exist');
            }

            sqlQuery = 'UPDATE movies SET title = ($1), description = ($2), image = ($3), category_id = ($4) WHERE id = ($5)'
            await DBConnection.query(sqlQuery, [request.body.title, request.body.description, request.file?.filename, request.body.category_id, request.params.movie_id]);

            DBConnection.release();
            return data;
        } catch (error) {
            throw new Error(error + '')
        }
    }
    // #=======================================================================================#
    // #                                    delete movies                                      #
    // #=======================================================================================#
    async deleteMovies(request: Request | any): Promise<movies> {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            let result = await DBConnection.query(sqlQuery, [request.user.id])
            const userData = result.rows[0]
            if (!userData) throw new Error('this user doesn\'t exist');

            sqlQuery = 'SELECT * FROM movies WHERE id = ($1)'
            result = await DBConnection.query(sqlQuery, [request.params.movie_id])
            const data = result.rows[0]
            // Make sure the person who wants to make an update category is the person who created it
            if (!data) throw new Error(`there is no movies with this is ${request.params.movie_id}`);

            if (data.user_id != userData.id) throw new Error('this movies can only be updated by the user who created it')

            sqlQuery = 'DELETE FROM movies WHERE id=($1)'
            await DBConnection.query(sqlQuery, [request.params.movie_id]);
            DBConnection.release();

            return data;
        } catch (error) {
            throw new Error(error + '')
        }
    }

}
