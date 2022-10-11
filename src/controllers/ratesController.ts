import { Request, Response, NextFunction } from 'express';

import { ratesModels } from '../models/ratesModels'

const newRate = new ratesModels()
// #=======================================================================================#
// #			                            create                                         #
// #=======================================================================================#
export const create = async (request: Request, response: Response, next: NextFunction) => {
    await newRate.create(request)
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
// #                                      update rates                                     #
// #=======================================================================================#
export const updateRates = async (request: Request, response: Response, next: NextFunction) => {
    await newRate.updateRates(request)
        .then(data => {
            response.json({
                status: 1,
                msg: 'rate updated successfully'
            })
        }).catch(error => {
            next(error)
        })
}
// #=======================================================================================#
// #                                       delete rates                                    #
// #=======================================================================================#
export const deleteRates = async (request: Request, response: Response, next: NextFunction) => {
    await newRate.deleteRates(request)
        .then(_ => {
            response.json({
                status: 1,
                msg: 'rate deleted successfully'
            })
        }).catch(error => {
            next(error)
        })
}


