import { NextFunction } from 'express'
import { IServiceRequest } from '../request'
import { AreaManager } from '../area/area';
import { IServiceResponse, makeResponse } from '../response';


export default (searchArea : AreaManager) => {
  return function(req : IServiceRequest, res : IServiceResponse, next : NextFunction) {

    let area = searchArea.getArea(res.locals.latLng)

    if(area === 'NOT_FOUND') {
      res.locals.serviceNotFound = true
      return makeResponse(req, res)
    }

    res.locals.serviceArea = area

    next()
  }
}
