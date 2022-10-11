// import { Request } from 'express';

// import Client from '../database';

// import validateRequest from '../utilities/validateRequest';

// export type rates = {
//     id: number,
//     rate: number,
//     user_id: number,
//     movie_id: number
// }

// export class ratesModels {
//     // #=======================================================================================#
//     // #			                            create                                         #
//     // #=======================================================================================#
//     async create(request: Request | any): Promise<rates> {
//         validateRequest(request);
//         try {
//             const DBConnection = await Client.connect()
//             let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
//             let result = await DBConnection.query(sqlQuery, [request.user.id])
//             const userData = result.rows[0]
//             if (!userData) throw new Error('this user doesn\'t exist');


//             sqlQuery = 'SELECT * FROM movies WHERE id=($1)'
//             result = await DBConnection.query(sqlQuery, [request.body.movie_id])
//             let data = result.rows[0]
//             if (!data) throw new Error(`there is no movie with this is ${request.body.movie_id}`);


//             // create rate
//             sqlQuery = 'INSERT INTO rates (rate,user_id,movie_id) VALUES($1,$2,$3) RETURNING *'
//             result = await DBConnection.query(sqlQuery, [request.body.rate, userData.id, request.body.movie_id])
//             data = result.rows[0]

//             // update move rate
//             sqlQuery = 'SELECT * FROM rates WHERE movie_id=($1)'
//             result = await DBConnection.query(sqlQuery, [request.body.movie_id])
//             data = result.rows
//             const data2 = [1,2,3,4,]
//             const user_rate = data2.length * 5
//             data2.reduce(()=>{

//             })

//                 console.log(data);


//             sqlQuery = 'UPDATE movies SET rate = ($1) WHERE movie_id = ($5)'
//             await DBConnection.query(sqlQuery, [request.body.movie_id]);


//             DBConnection.release()
//             return data
//         } catch (error) {
//             throw new Error(error + '')
//         }
//     }

//     // #=======================================================================================#
//     // #                                     update rates                                      #
//     // #=======================================================================================#
//     async updateRates(request: Request | any): Promise<rates> {
//         validateRequest(request);
//         try {
//             const DBConnection = await Client.connect()
//             let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
//             let result = await DBConnection.query(sqlQuery, [request.user.id])
//             const userData = result.rows[0]
//             if (!userData) throw new Error('this user doesn\'t exist');


//             sqlQuery = 'SELECT * FROM categories WHERE id=($1)'
//             result = await DBConnection.query(sqlQuery, [request.body.category_id])
//             let data = result.rows[0]
//             if (!data) throw new Error(`there is no category with this is ${request.body.category_id}`);


//             sqlQuery = 'SELECT * FROM movies WHERE id = ($1)'
//             result = await DBConnection.query(sqlQuery, [request.params.movie_id])
//             data = result.rows[0]
//             // Make sure the person who wants to make an update category is the person who created it
//             if (!data) throw new Error(`there is no movies with this is ${request.params.movie_id}`);

//             if (data.user_id != userData.id) throw new Error('this movies can only be updated by the user who created it')


//             if (data.title != request.body.title) {
//                 sqlQuery = 'SELECT * FROM movies WHERE title = ($1)'
//                 result = await DBConnection.query(sqlQuery, [request.body.title])
//                 data = result.rows[0]
//                 if (data) throw new Error('this title is already exist');
//             }

//             sqlQuery = 'UPDATE movies SET title = ($1), description = ($2), image = ($3), category_id = ($4) WHERE id = ($5)'
//             await DBConnection.query(sqlQuery, [request.body.title, request.body.description, request.file?.filename, request.body.category_id, request.params.movie_id]);

//             DBConnection.release();
//             return data;
//         } catch (error) {
//             throw new Error(error + '')
//         }
//     }
//     // #=======================================================================================#
//     // #                                    delete rates                                       #
//     // #=======================================================================================#
//     async deleteRates(request: Request | any): Promise<rates> {
//         validateRequest(request);
//         try {
//             const DBConnection = await Client.connect()
//             let sqlQuery = 'SELECT * FROM users WHERE id=($1)'
//             let result = await DBConnection.query(sqlQuery, [request.user.id])
//             const userData = result.rows[0]
//             if (!userData) throw new Error('this user doesn\'t exist');

//             sqlQuery = 'SELECT * FROM movies WHERE id = ($1)'
//             result = await DBConnection.query(sqlQuery, [request.params.movie_id])
//             const data = result.rows[0]
//             // Make sure the person who wants to make an update category is the person who created it
//             if (!data) throw new Error(`there is no movies with this is ${request.params.movie_id}`);

//             if (data.user_id != userData.id) throw new Error('this movies can only be updated by the user who created it')

//             sqlQuery = 'DELETE FROM movies WHERE id=($1)'
//             await DBConnection.query(sqlQuery, [request.params.movie_id]);
//             DBConnection.release();

//             return data;
//         } catch (error) {
//             throw new Error(error + '')
//         }
//     }
// }
