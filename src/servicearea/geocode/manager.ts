import { IGeocode, ILatLngError, ILatLng, isError } from "./interfaces/geocode"
import { LatLng } from './classes/latlng'
import { Error } from './classes/error'

export class Manager implements IGeocode {
  private services : Array<IGeocode> = []
  private attempts : Array<ILatLngError> = []

  public registerService(service : IGeocode) {
    if(this.serviceExists(service)) {
      throw 'You cannot add the same service twice'
    }

    this.services.push(service)
  }

  private serviceExists(service : IGeocode) : boolean {
    return this.services.some(existingService => typeof existingService === typeof service)
  }

  public async getLatLng(searchString) : Promise<ILatLng|ILatLngError> {
    this.clearAttempts()

    for (const service of this.services) {
      let result = await service.getLatLng(searchString)

      if(isError(result)) {
        this.attempts.push(result)
      } else {
        return result
      }
    }

    return new Error('NOT_FOUND')
  }

  private clearAttempts() {
    this.attempts = []
  }

  public getAttempts() : Array<ILatLngError> {
    return this.attempts
  }
}