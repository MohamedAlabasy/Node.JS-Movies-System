import { Request, Response, NextFunction } from 'express';

import { moviesModels } from '../models/moviesModels'

const newMovie = new moviesModels()
// #=======================================================================================#
// #			                            create                                         #
// #=======================================================================================#
export const create = async (request: Request, response: Response, next: NextFunction) => {
    await newMovie.create(request)
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
// #                                    get movie by id                                    #
// #=======================================================================================#
export const getMoviesById = async (request: Request, response: Response, next: NextFunction) => {
    await newMovie.getMoviesById(request)
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
// #                                     get all movies                                    #
// #=======================================================================================#
export const getAllMovies = async (request: Request, response: Response, next: NextFunction) => {
    await newMovie.getAllMovies(request)
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
// #=======================================================================================#
// #                                      update movie                                     #
// #=======================================================================================#
export const updateMovies = async (request: Request, response: Response, next: NextFunction) => {
    await newMovie.updateMovies(request)
        .then(data => {
            response.json({
                status: 1,
                msg: 'movie updated successfully'
            })
        }).catch(error => {
            next(error)
        })
}
// #=======================================================================================#
// #                                       delete movie                                    #
// #=======================================================================================#
export const deleteMovies = async (request: Request, response: Response, next: NextFunction) => {
    await newMovie.deleteMovies(request)
        .then(_ => {
            response.json({
                status: 1,
                msg: 'movie deleted successfully'
            })
        }).catch(error => {
            next(error)
        })
}


