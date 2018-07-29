import { IServiceRequest } from "./request";
import { Response } from 'express'
import { ILatLng } from "./geocode/interfaces/geocode";

export interface ServiceAreaLocal extends Object {
  isInvalidSearch: boolean,
  latLngNotFound: boolean,
  serviceNotFound: boolean
  latLng: ILatLng,
  serviceArea: string
}

export interface IServiceResponse extends Response {
  locals : ServiceAreaLocal
}


export function makeResponse(req : IServiceRequest, res : IServiceResponse) {

  if(res.locals.isInvalidSearch) {
    return res.status(422).json({ status: "ERROR", reason: "Invalid Search Term" })
  }

  const search_string: string = req.params.search_string;

  if(res.locals.latLngNotFound || res.locals.serviceNotFound) {
    return res.status(404).json({
      status: "NOT_FOUND",
      search: search_string
    })
  }

  return res.status(200).json({
    status: "OK",
    search: search_string,
    location: {
      lat: res.locals.latLng.getLat(),
      lng: res.locals.latLng.getLng(),
      serviceArea: res.locals.serviceArea
    }
  })

}