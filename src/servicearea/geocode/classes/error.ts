import { ILatLngError } from '../interfaces/geocode'

export class Error implements ILatLngError {

  private error: string;

  constructor(error : string) {
    this.error = error
  }
  
  public getError() : string {
    return this.error
  }
}