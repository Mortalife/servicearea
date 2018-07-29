import { Request, Response, NextFunction } from 'express';
import { IServiceResponse } from '../response'

export default function(req : Request, res : Response, next : NextFunction) {
  res.locals.isInvalidSearch = false
  res.locals.latLngNotFound = false
  res.locals.serviceNotFound = false

  next()   
}