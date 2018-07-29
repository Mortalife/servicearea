import { point, FeatureCollection, Feature, featureCollection, booleanPointInPolygon, featureEach } from "@turf/turf"
import { ILatLng } from '../geocode/interfaces/geocode'

export class AreaManager {
  private features

  constructor(serviceAreaData) {
    this.features = featureCollection(serviceAreaData.features)
  }

  getArea(latLng : ILatLng) {
    let loc = point([latLng.getLng(), latLng.getLat()])

    for(const feature of this.features.features) {
      if(booleanPointInPolygon(loc, feature.geometry)) {
        return feature.properties.Name
      }
    }

    return 'NOT_FOUND'
  }
}