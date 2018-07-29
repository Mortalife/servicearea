import { NextFunction } from 'express'
import { isError } from '../geocode/interfaces/geocode'
import { IServiceRequest } from '../request'
import GoogleGeocode from '../geocode/services/google'
import { Manager } from '../geocode/manager'
import { makeResponse, IServiceResponse } from '../response';

const google = new GoogleGeocode();

export default async function(req : IServiceRequest, res : IServiceResponse, next : NextFunction) {
  const search_string: string = req.params.search_string;
  const lookupManager = new Manager();

  lookupManager.registerService(google)

  let result = await lookupManager.getLatLng(search_string)

  if(isError(result)) {
    res.locals.latLngNotFound = true
    return makeResponse(req, res)
  }

  res.locals.latLng = result

  next()

}