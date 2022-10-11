import { Request } from 'express';

import Client from '../database';

import validateRequest from '../utilities/validateRequest';

export type categories = {
    id: number,
    title: string,
    user_id: number
}

export class categoriesModels {
    // #=======================================================================================#
    // #			                            create                                         #
    // #=======================================================================================#
    async create(request: Request | any): Promise<categories> {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            let result = await DBConnection.query(sqlQuery, [request.user.id])
            let data = result.rows[0]

            if (!data) throw new Error('this user doesn\'t exist');

            // admin only can create category
            if (!data.is_admin) throw new Error('Only the admin can create category')

            // create category
            sqlQuery = 'INSERT INTO categories (title, user_id) VALUES($1, $2) RETURNING *'
            result = await DBConnection.query(sqlQuery, [request.body.title, data.id])
            data = result.rows[0]


            DBConnection.release()
            return data
        } catch (error) {
            throw new Error(error + '')
        }
    }
    // #=======================================================================================#
    // #                                 get category by id                                    #
    // #=======================================================================================#
    async getCategoryById(request: Request | any): Promise<categories> {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            let result = await DBConnection.query(sqlQuery, [request.user.id])
            let data = result.rows[0]

            if (!data) throw new Error('this user doesn\'t exist');


            sqlQuery = 'SELECT * FROM categories WHERE id=($1)'
            result = await DBConnection.query(sqlQuery, [request.params.category_id])
            data = result.rows[0]

            if (!data) throw new Error(`No category with this id = ${request.params.category_id}`)

            DBConnection.release();

            return data;
        } catch (error) {
            throw new Error(error + '')
        }
    }

    // #=======================================================================================#
    // #                                  get all categories                                   #
    // #=======================================================================================#
    async getAllCategories(request: Request | any): Promise<categories[]> {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            let result = await DBConnection.query(sqlQuery, [request.user.id])
            let data = result.rows[0]

            if (!data) throw new Error('this user doesn\'t exist');


            result = await DBConnection.query('SELECT * FROM categories')
            data = result.rows
            DBConnection.release();

            if (data.length === 0) {
                throw new Error('No categories to show')
            }

            return data;
        } catch (error) {
            throw new Error(error + '')
        }
    }
    // #=======================================================================================#
    // #                                      update Category                                  #
    // #=======================================================================================#
    async updateCategory(request: Request | any): Promise<categories> {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            let result = await DBConnection.query(sqlQuery, [request.user.id])
            let data = result.rows[0]

            if (!data) throw new Error('this user doesn\'t exist');

            // admin only can create category
            if (!data.is_admin) throw new Error('Only the admin can update category')

            sqlQuery = 'SELECT * FROM categories WHERE id=($1)'
            result = await DBConnection.query(sqlQuery, [request.params.category_id])
            data = result.rows[0]

            // Make sure the person who wants to make an update category is the person who created it
            if (data.user_id != request.user.id) throw new Error('this category can only be update by the admin who created it')

            if (!data) throw new Error(`there is no category with id = ${request.params.category_id}`);

            sqlQuery = 'UPDATE categories SET title = ($1) WHERE id=($2)'
            await DBConnection.query(sqlQuery, [request.body.title, request.params.category_id]);
            DBConnection.release();

            return data;
        } catch (error) {
            throw new Error(error + '')
        }
    }
    // #=======================================================================================#
    // #                                      delete Category                                  #
    // #=======================================================================================#
    async deleteCategory(request: Request | any): Promise<categories> {
        validateRequest(request);
        try {
            const DBConnection = await Client.connect()
            let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
            let result = await DBConnection.query(sqlQuery, [request.user.id])
            let data = result.rows[0]

            if (!data) throw new Error('this user doesn\'t exist');

            // admin only can create category
            if (!data.is_admin) throw new Error('Only the admin can delete category')

            sqlQuery = 'SELECT * FROM categories WHERE id=($1)'
            result = await DBConnection.query(sqlQuery, [request.params.category_id])
            data = result.rows[0]

            // Make sure the person who wants to make an update category is the person who created it
            if (data.user_id != request.user.id) throw new Error('this category can only be deleted by the admin who created it')

            if (!data) throw new Error(`there is no category with id = ${request.params.category_id}`);

            sqlQuery = 'DELETE FROM categories WHERE id=($1)'
            await DBConnection.query(sqlQuery, [request.params.category_id]);
            DBConnection.release();

            return data;
        } catch (error) {
            throw new Error(error + '')
        }
    }
}
