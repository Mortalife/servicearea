import { ILatLng } from '../interfaces/geocode'

export class LatLng implements ILatLng {
  
  private lat: number
  private lng: number
  
  constructor(lat : number, lng : number) {
    this.lat = lat
    this.lng = lng
  }
  
  public getLat() : number {
    return this.lat
  }

  public getLng() : number {
    return this.lng
  }

}