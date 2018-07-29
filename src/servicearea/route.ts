import { Router } from 'express'
import { IRoute } from '../route'
import isValidRequest from './middleware/isValidRequest'
import findLatLng from './middleware/findLatLng'
import findServiceArea from './middleware/findServiceArea'
import { AreaManager } from './area/area'
import { makeResponse } from './response';

class ServiceAreaRoute implements IRoute {
  private router : Router
  private serviceAreaData : object

  constructor(serviceAreaData) {
    this.router = Router()
    this.serviceAreaData = serviceAreaData
  }

  public getRoutes() : Router {
    this.router.get(
      '/:search_string?', 
      isValidRequest, 
      findLatLng,
      findServiceArea(new AreaManager(this.serviceAreaData)),
      makeResponse
      )

    return this.router
  }

  public getUri() : string {
    return '/servicearea'
  }
}

export default ServiceAreaRoute;