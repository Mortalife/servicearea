import { Request } from 'express'

export interface IServiceParams extends Object {
  search_string: string
}

export interface IServiceRequest extends Request {
  params : IServiceParams
}