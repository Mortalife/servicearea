import { Request, NextFunction } from 'express'
import { sanitizeParam } from 'express-validator/filter';
import { check, validationResult } from 'express-validator/check'
import { makeResponse, IServiceResponse } from '../response';

export default [
  sanitizeParam('search_string')
    .trim()
    .whitelist('a-zA-Z0-9 '),

  check('search_string')
    .exists(),

  function(req : Request, res : IServiceResponse, next : NextFunction) {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      res.locals.isInvalidSearch = true
      return makeResponse(req, res)
    }

    next()   
  }
]