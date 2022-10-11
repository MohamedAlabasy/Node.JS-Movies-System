import { Request, Response, NextFunction } from 'express';

import { categoriesModels } from '../models/categoriesModels'

const newCategory = new categoriesModels()
// #=======================================================================================#
// #			                            Register                                       #
// #=======================================================================================#
export const create = async (request: Request, response: Response, next: NextFunction) => {
    await newCategory.create(request)
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
// #                                 get category by id                                    #
// #=======================================================================================#
export const getCategoryById = async (request: Request, response: Response, next: NextFunction) => {
    await newCategory.getCategoryById(request)
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
// #                                    get all categories                                 #
// #=======================================================================================#
export const getAllCategories = async (request: Request, response: Response, next: NextFunction) => {
    await newCategory.getAllCategories(request)
        .then(categoriesData => {
            response.json({
                status: 1,
                count: categoriesData.length,
                data: categoriesData
            })
        }).catch(error => {
            next(error)
        })
}
// #=======================================================================================#
// #                                      update Category                                  #
// #=======================================================================================#
export const updateCategory = async (request: Request, response: Response, next: NextFunction) => {
    await newCategory.updateCategory(request)
        .then(data => {
            response.json({
                status: 1,
                msg: 'title updated successfully'
            })
        }).catch(error => {
            next(error)
        })
}
// #=======================================================================================#
// #                                      delete Category                                  #
// #=======================================================================================#
export const deleteCategory = async (request: Request, response: Response, next: NextFunction) => {
    await newCategory.deleteCategory(request)
        .then(_ => {
            response.json({
                status: 1,
                msg: 'category deleted successfully'
            })
        }).catch(error => {
            next(error)
        })
}


