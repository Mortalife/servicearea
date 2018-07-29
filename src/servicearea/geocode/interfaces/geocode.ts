export interface ILatLng {
  getLat() : number
  getLng() : number
}

export interface ILatLngError {
  getError() : string
}

export function isError(result: ILatLng|ILatLngError): result is ILatLngError {
  return typeof (<ILatLngError>result).getError !== 'undefined';
}

export interface IGeocode {
  getLatLng(address: string) : Promise<ILatLng|ILatLngError>
}