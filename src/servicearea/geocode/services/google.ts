import { ILatLng, IGeocode, ILatLngError } from '../interfaces/geocode'
import { LatLng } from '../classes/latlng'
import { Error } from '../classes/error'
import { createClient, GoogleMapsClient } from '@google/maps'
import * as process from 'process'

class GoogleGeocode implements IGeocode {
  private client : GoogleMapsClient

  constructor() {
    this.client = createClient({
      key: process.env.GOOGLE_API_KEY,
      Promise: Promise 
    })
  }

  public async getLatLng(address: string) : Promise<ILatLng|ILatLngError> {
    try {
      let response = await this.client.geocode({ address: address }).asPromise()

      this.isValidStatus(response.json.status)

      let [lat, lng] = this.parseResponse(response)

      return new LatLng(lat, lng)

    } catch (error) {

      return new Error(error)

    }
  }

  private isValidStatus(status) {
    if(status != "OK") {
      throw status
    }
  }

  private parseResponse(response) : Array<number> {
    return [
      response.json.results[0].geometry.location.lat,
      response.json.results[0].geometry.location.lng
    ]
  }
}

export default GoogleGeocode